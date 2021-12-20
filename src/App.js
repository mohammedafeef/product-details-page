import { useEffect } from "react";
import styled from "styled-components";

// productDetails which is given
const ProductDetails = [
  { name: "product_id", value: "1" },
  { name: "store", value: "1" },
];
function App() {
  const [count, setCount] = useState(0);
  const [productDetails, setProductDetails] = useState();
  const generateFormData = (data) => {
    const formData = new FormData();
    data.forEach((item) => formData.append(item.name, item.value));
    return formData;
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch("https://dev.nazdik.in/api/product/show", {
        method: "POST",
        body: generateFormData(ProductDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const product = await response.json();
      console.log(resposnse, product);
    };
    fetchProductDetails();
  }, []);
  const handleDecreaseCount = setCount(count--);
  const handleIncreaseCount = setCount(count++);
  return (
    <ProductWrapper>
      <ImagesWrapper>
        <ImageList>
          <Image src="https://via.placeholder.com/150" />
        </ImageList>
        <SelectedImageContainer>
          <SelectedImage></SelectedImage>
        </SelectedImageContainer>
      </ImagesWrapper>
      <Details>
        <Name></Name>
        <ProductSku></ProductSku>
        <Describtion></Describtion>
        <Price></Price>
        <Quantity>
          <Counter onClick={handleDecreaseCount}>-</Counter>
          <Count>{count}</Count>
          <Counter onClick={handleIncreaseCount}>+</Counter>
        </Quantity>
      </Details>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  padding: 3em;
`;
// image section
const ImagesWrapper = styled.div`
  display: flex;
  padding: 1em;
  width: 50%;
`;
const ImageList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Image = styled.img`
  width: 30%;
  height: 5em;
`;
const SelectedImageContainer = styled.div`
  width: 70%;
  height: 100%;
`;
const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
`;

// details section
const Details = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;
const Name = styled.div`
  font-size: 2em;
  font-weight: bold;
  padding: 1em 0;
`;

const ProductSku = styled.div`
  font-size: 1em;
  font-weight: lighter;
  padding: 0.5em 0;
  color: #999;
`;

const Describtion = styled.div`
  font-size: 1.5em;
  padding: 1em 0;
`;

const Price = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  padding: 1em 0;
`;
const Quantity = styled.div`
  display: flex;
  padding: 1em 0;
`;
const Counter = styled.button`
  padding: 1em;
  border-radius: 50%;
  border: none;
`;
const Count = styled.div`
  padding: 0 1em;
  font-size: 1.5em;
  font-weight: bold;
`;

export default App;
