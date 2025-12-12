import Banner from "./banner/Banner";
import BestSellProduct from "./bestSell_product/BestSellProduct";
import ContactPreFooter from "./contact_pre_footer/ContactPreFooter";
import DescribeProduct from "./describe_product/Decribe_product.Jsx";
import HomeProduct from "./home_product/HomeProduct";
import NewProduct from "./new_product/NewProduct";
import ProductIntro from "./product_intro/ProductIntro";

export default function Home() {
    return (
        <div>
            <Banner />
            <NewProduct />
            <ProductIntro />
            <HomeProduct />
            <BestSellProduct />
            <DescribeProduct />
            {/* <ContactPreFooter /> */}
        </div>
    )
}