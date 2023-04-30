import bcrypt from 'bcryptjs';

const data = {
 

  products: [
    {
      
      name: 'productA-name',
      category: "Men's Clothing",
      price: 100,
      token: 'productA-token',
      brand: 'Teva',
      countInStock: 6,
      rating: 2.5,
      numReviews: 80,
      description: 'liquid capsule',
      image: '/images/p1.jpeg',
    },
    {
      
      name: 'productB-name',
      category: "Men's Clothing",
      price: 15,
      token: 'productB-token',
      brand: 'Teva',
      countInStock: 0,
      rating: 2.5,
      numReviews: 100,
      description: 'liquid capsule',
      image: '/images/p2.jpeg',
    },
    {
      
      name: 'productC-name',
      category: "Men's Clothing",
      price: 20,
      token: 'productC-token',
      brand: 'Teva',
      countInStock: 12,
      rating: 2.5,
      numReviews: 13,
      description: 'liquid capsule',
      image: '/images/p3.jpeg',
    },
    {
      _id: 4,
      name: 'productD-name',
      category: "Men's Clothing",
      price: 60,
      token: 'productD-token',
      brand: 'Teva',
      countInStock: 4,
      rating: 2.5,
      numReviews: 10,
      description: 'liquid capsule',
      image: '/images/p4.jpeg',
    },

    {
     
      name: 'productE-name',
      category: "Men's Clothing",
      price: 100,
      token: 'productE-token',
      brand: 'Teva',
      countInStock: 6,
      rating: 2.5,
      numReviews: 80,
      description: 'liquid capsule',
      image: '/images/p1.jpeg',
    },
    {
     
      name: 'productF-name',
      category: "Men's Clothing",
      price: 15,
      token: 'productF-token',
      brand: 'Teva',
      countInStock: 2,
      rating: 2.5,
      numReviews: 100,
      description: 'liquid capsule',
      image: '/images/p2.jpeg',
    },
    {
    
      name: 'productG-name',
      category: "Men's Clothing",
      price: 20,
      token: 'productG-token',
      brand: 'Teva',
      countInStock: 12,
      rating: 2.5,
      numReviews: 13,
      description: 'liquid capsule',
      image: '/images/p3.jpeg',
    },
    {
      
      name: 'productH-name',
      category: "Men's Clothing",
      price: 60,
      token: 'productH-token',
      brand: 'Teva',
      countInStock: 4,
      rating: 2.5,
      numReviews: 10,
      description: 'liquid capsule',
      image: '/images/p4.jpeg',
    },
  ], 

  users:[
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("12345")
    }

  ]
};
export default data;
