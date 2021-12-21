import { useEffect, useState } from "react";
import styled from "styled-components";

// productDetails which is given
const ProductDetails = [
  { name: "product_id", value: "1" },
  { name: "store", value: "1" },
];

function App() {
  const [count, setCount] = useState(1);
  const [productDetails, setProductDetails] = useState();
  const [selectedImage, setSelectedImage] = useState(0);
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
          Accept: "application/json",
        },
      });
      const product = await response.json();
      setProductDetails(product.data);
    };
    fetchProductDetails();
  }, []);
  const handleDecreaseCount = () => setCount(count > 1 ? count - 1 : 0);
  const handleIncreaseCount = () => setCount(count + 1);
  const changeProductImage = (index) => setSelectedImage(index);
  return (
    <ProductWrapper>
      {productDetails && (
        <>
          <ImagesWrapper>
            <ImageList>
              {productDetails.images.map((image, index) => (
                <Image
                  src={image.images}
                  onClick={() => changeProductImage(index)}
                />
              ))}
            </ImageList>
            <SelectedImageContainer>
              <SelectedImageView
                src={productDetails.images[selectedImage].images}
              />
            </SelectedImageContainer>
          </ImagesWrapper>
          <Details>
            <Name>{productDetails.name}</Name>
            <ProductSku>{productDetails.sku}</ProductSku>
            <Describtion>{productDetails.description}</Describtion>
            <Price>₹{productDetails.price}</Price>
            <Quantity>
              <Counter onClick={handleDecreaseCount} danger>
                -
              </Counter>
              <Count>{count}</Count>
              <Counter onClick={handleIncreaseCount} success>
                +
              </Counter>
            </Quantity>
          </Details>
        </>
      )}
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
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
  width: 70%;
  height: 6em;
  margin: 0.5em 0;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out;
  :hover{
    opacity: 0.9;
  }

`;
const SelectedImageContainer = styled.div`
  width: 70%;
  height: 100%;
`;
const SelectedImageView = styled.img`
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
  padding: 1em 0 0;
`;

const ProductSku = styled.div`
  font-size: 1em;
  font-weight: lighter;
  padding: 0.5em 0;
  color: #999;
`;

const Describtion = styled.div`
  font-size: 1.5em;
  padding: 1em 0 0;
`;

const Price = styled.div`
  font-size: 2em;
  font-weight: bold;
  padding: 1em 0;
`;
const Quantity = styled.div`
  display: flex;
  padding: 1em 0;
`;
const Counter = styled.button`
  font-size: 2em;
  font-weight: bolder;
  padding: 0.2em 0.5em;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.success
      ? "rgba(0,200,0,.4)"
      : props.danger
      ? "rgba(200,0,0,.4)"
      : "white"};
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.96);
  }
`;
const Count = styled.div`
  padding: 0 1em;
  font-size: 2em;
  font-weight: bold;
`;

export default App;
