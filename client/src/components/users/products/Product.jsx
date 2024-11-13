import AllProduct from "./allproduct/AllProduct";
import ImageSlider from "./slider/Slider";

export default function Product() {
    return (
        <div className="min-h-screen text-gray-900">
            <ImageSlider/>
            <AllProduct/>
        </div>
    )
}