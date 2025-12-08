from flask import Flask, request, jsonify
import face_recognition
import os
import base64
import cv2
import numpy as np
import pickle

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB

ENCODE_DIR = 'encodings/'
if not os.path.exists(ENCODE_DIR):
    os.makedirs(ENCODE_DIR)

ENCODINGS = {}

def load_encodings():
    global ENCODINGS
    if not ENCODINGS:
        for fname in os.listdir(ENCODE_DIR):
            try:
                with open(os.path.join(ENCODE_DIR, fname), 'rb') as f:
                    ENCODINGS[fname.split('.')[0]] = pickle.load(f)
            except Exception as e:
                print(f"[LOAD ENCODINGS ERROR] {fname}: {str(e)}")
    return ENCODINGS

def process_image(image_base64):
    try:
        if "base64," in image_base64:
            image_base64 = image_base64.split("base64,")[1]

        image_data = base64.b64decode(image_base64, validate=True)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
        if img is None:
            print("[PROCESS_IMAGE] Không đọc được ảnh từ base64")
            return None, "Không đọc được ảnh từ base64"

        # cv2.imwrite("debug_input.jpg", img)
        # print(f"[PROCESS_IMAGE] Ảnh gốc đã được lưu tại debug_input.jpg, Kích thước: {img.shape}, Kiểu dữ liệu: {img.dtype}")

        if len(img.shape) == 3 and img.shape[2] == 4:
            print("[PROCESS_IMAGE] Chuyển đổi ảnh RGBA sang BGR")
            img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
        elif len(img.shape) == 2:
            print("[PROCESS_IMAGE] Chuyển đổi ảnh grayscale sang BGR")
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
        elif len(img.shape) != 3 or img.shape[2] != 3:
            print(f"[PROCESS_IMAGE] Ảnh không hợp lệ: {img.shape}")
            return None, "Ảnh không phải định dạng RGB/BGR 3 kênh"

        alpha = 1.0  # Độ tương phản
        beta = 10    # Độ sáng
        img = cv2.convertScaleAbs(img, alpha=alpha, beta=beta)

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        if img_rgb.dtype != np.uint8:
            print(f"[PROCESS_IMAGE] Ảnh không phải 8-bit: {img_rgb.dtype}")
            return None, "Ảnh không phải 8-bit"

        img_rgb = np.ascontiguousarray(img_rgb)

        max_size = 800
        height, width = img_rgb.shape[:2]
        if max(height, width) > max_size:
            scale = max_size / max(height, width)
            img_rgb = cv2.resize(img_rgb, (int(width * scale), int(height * scale)), interpolation=cv2.INTER_AREA)
            print(f"[PROCESS_IMAGE] Đã resize ảnh thành: {img_rgb.shape}")

        # cv2.imwrite("debug_preprocessed.jpg", cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR))
        # print("[PROCESS_IMAGE] Ảnh sau tiền xử lý đã được lưu tại debug_preprocessed.jpg")

        print(f"[PROCESS_IMAGE] Kích thước ảnh RGB: {img_rgb.shape}, Kiểu dữ liệu: {img_rgb.dtype}, Contiguous: {img_rgb.flags['C_CONTIGUOUS']}")
        return img_rgb, None
    except Exception as e:
        print(f"[PROCESS_IMAGE ERROR] {str(e)}")
        return None, f"Lỗi xử lý ảnh: {str(e)}"

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data or "manv" not in data or "image" not in data:
            return jsonify({"error": "Thiếu manv hoặc image"}), 400

        manv = data["manv"]
        image_base64 = data["image"]
        print("[REGISTER] Nhận data:", manv, image_base64[:30])

        img_rgb, error = process_image(image_base64)
        if error:
            return jsonify({"error": error}), 400

        print("[REGISTER] Bắt đầu trích xuất encodings, Kích thước ảnh:", img_rgb.shape)
        try:
            face_encodings = face_recognition.face_encodings(img_rgb, num_jitters=5)
            print("[REGISTER] Số encodings tìm thấy:", len(face_encodings))
            if len(face_encodings) == 0:
                return jsonify({"error": "Không phát hiện khuôn mặt"}), 400
            if len(face_encodings) > 1:
                return jsonify({"error": "Ảnh chứa nhiều hơn một khuôn mặt"}), 400

            descriptor = face_encodings[0]
            with open(os.path.join(ENCODE_DIR, f"{manv}.pkl"), "wb") as f:
                pickle.dump(descriptor, f)

            global ENCODINGS
            ENCODINGS[manv] = descriptor

            print("[REGISTER] Thành công:", manv)
            return jsonify({"success": True})
        except Exception as e:
            print(f"[REGISTER FACE_ENCODE ERROR] {str(e)}")
            return jsonify({"error": f"Lỗi khi trích xuất encodings: {str(e)}"}), 500

    except Exception as e:
        print("[REGISTER ERROR]", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/recognize', methods=['POST'])
def recognize():
    try:
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "Thiếu image"}), 400

        image_base64 = data['image']
        manv_client = data.get('manv')  
        img_rgb, error = process_image(image_base64)
        if error:
            return jsonify({'success': False, 'error': error}), 400

        unknown_faces = face_recognition.face_encodings(img_rgb, num_jitters=5)
        if not unknown_faces:
            return jsonify({'success': False, 'message': 'Không nhận diện được khuôn mặt'}), 400
        if len(unknown_faces) > 1:
            return jsonify({'success': False, 'message': 'Ảnh chứa nhiều hơn một khuôn mặt'}), 400

        known = load_encodings()

        if manv_client:
            # Chỉ so sánh với manv được chỉ định
            known_encoding = known.get(manv_client)
            if not known_encoding:
                return jsonify({'success': False, 'message': f'Không tìm thấy mã nhân viên: {manv_client}'}), 400

            match = face_recognition.compare_faces([known_encoding], unknown_faces[0], tolerance=0.5)[0]
            if match:
                return jsonify({'success': True, 'manv': manv_client})
            else:
                return jsonify({'success': False, 'message': 'Khuôn mặt không khớp với mã nhân viên đã gửi'}), 400
        else:
            # Không có mã nhân viên, duyệt tất cả
            for manv, enc in known.items():
                match = face_recognition.compare_faces([enc], unknown_faces[0], tolerance=0.5)[0]
                if match:
                    return jsonify({'success': True, 'manv': manv})

            return jsonify({'success': False, 'message': 'Không khớp khuôn mặt nào'})

    except Exception as e:
        print("[RECOGNIZE ERROR]", str(e))
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    load_encodings()
    app.run(port=5000)




# import cv2
# import dlib
# import numpy as np
# im
# img = cv2.imread("debug_preprocessed.jpg")
# if img is None:
#     print("Không thể đọc ảnh, tệp có thể bị hỏng hoặc đường dẫn sai")
# else:
#     print(f"Kích thước: {img.shape}, Kiểu dữ liệu: {img.dtype}, Số kênh: {img.shape[2]}")
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img_rgb = np.ascontiguousarray(img_rgb)
#     print(f"Kích thước RGB: {img_rgb.shape}, Kiểu dữ liệu: {img_rgb.dtype}, Contiguous: {img_rgb.flags['C_CONTIGUOUS']}")
# print(f"Phiên bản dlib: {dlib.__version__}, face_recognition: {face_recognition.__version__}")


