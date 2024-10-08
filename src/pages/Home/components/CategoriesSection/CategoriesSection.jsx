import "./CategoriesSection.css";

export const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      categoryName: "Cultural",
      img: "https://res.cloudinary.com/diej1zlz4/image/upload/v1727947038/samples/coffee.jpg", 
    },
    {
      id: 2,
      categoryName: "Aventura",
      img: "https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/ecommerce/leather-bag-gray.jpg", 
    },
    {
      id: 3,
      categoryName: "Relax",
      img: "https://res.cloudinary.com/diej1zlz4/image/upload/v1727947031/samples/landscapes/beach-boat.jpg", 
    },
  ];

  return (
    <div>
      <h1 className="categories-heading">Elige por categoria</h1>
      <div className="categories-container">
        {categories.map(({ id, categoryName, img }) => (
          <div className="category-card" key={id}>
            <div className="img-cont">
              <img src={img} alt={categoryName} />
            </div>
            <h3>{categoryName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
