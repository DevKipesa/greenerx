import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Organic Apple",
    description: "Fresh organic apples from local farms.",
    price: "$3.99",
    image: "/images/apple.jpg",
  },
  {
    id: 2,
    name: "Organic Avocado",
    description: "Creamy organic avocados perfect for salads.",
    price: "$5.99",
    image: "/images/avocado.jpg",
  },
  {
    id: 3,
    name: "Organic Carrot",
    description: "Crunchy organic carrots packed with vitamins.",
    price: "$2.49",
    image: "/images/carrot.jpg",
  },
];

const OrganicProducts = () => {
  return (
    <div className="py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Organic Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="relative h-64 w-full">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold mb-4">{product.price}</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganicProducts;
