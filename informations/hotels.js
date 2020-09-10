const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

export const HOTELS = [
    {
        id: 0,
        name: 'The Oberoi Udaivilas, Udaipur',
        number: '0294 243 3300',
        price: '10641',
        featured: true,
        rating: 5,
        category: '5-star hotel',
        address: 'Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Pichola, Udaipur, Rajasthan 313001',
        convenienceFee: 1000 ,
        images: [
            "https://pix10.agoda.net/hotelImages/4865309/0/43fc597b2fe742f5fbc646be0c4f391b.jpg?s=1024x768",
            "https://www.travelplusstyle.com/wp-content/gallery/the-oberoi-udaivilas-udaipur/premier-rooms-with-semi-private-pool-the-oberoi-udaivilas-udaipur-2.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI1scz28XGnusV6NjeVCfv-Tk0j9MScGa1lQ&usqp=CAU"
        ],
        latitude: 24.577617, longitude: 73.672409
    },
    {
        id: 1,
        name: 'Trident Hotel Udaipur',
        number: '0294 243 2200',
        price: '9785',
        featured: true,
        rating: 4.5,
        category: '4.5-star hotel',
        address: 'Malla Talai Chowk, Trident Rd, near Pichola, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001',
        convenienceFee: 1000 ,
        images: [
            "https://www.maldivesjobs.info/wp-content/uploads/2019/12/Trident-Udaipur.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkurVtwgNKK7X6kHfxRqBDr9i-ErzT84BDoQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdbQZ96v0jx3lnWORUhbg7nQjSErSILVkyZA&usqp=CAU"
        ],
        longitude: 73.66904 , latitude: 24.577139
    },
    {
        id: 2,
        name: 'Ananta Udaipur',
        number: '2698 480 6585',
        price: `10250`,
        featured: true,
        rating: 5,
        category:  '5-star hotel',
        address: 'Village Bujhda, Tehsil Girwa, Kodiyat Main Rd, Udaipur, Rajasthan 313031',
        convenienceFee: 1000,
        images: [
            "https://www.udaipurian.com/wp-content/uploads/2020/03/the-ananta-udaipur-udaipurian.jpg",
            "https://r1imghtlak.mmtcdn.com/8a878482a70311eab4be0242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;25,0&output-format=jpg",
            "https://res.cloudinary.com/simplotel/image/upload/w_5000,h_2810/x_2,y_0,w_4996,h_2810,r_0,c_crop,q_80,fl_progressive/w_400,f_auto,c_fit/ananta-hotels-udaipur/facade_of_the_lobby_at_Ananta_udaipur_y4utla",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTu2g2r8c2fYiyYl8-7-vrWxZoRY2-8W06F-Q&usqp=CAU"
        ],
        latitude: 24.570701, longitude: 73.626145
    },
    {
        id: 3,
        name: 'The LaLiT Laxmi Vilas Palace ',
        number: '0294 301 7777  ',
        price: `14300`,
        featured: true,
        rating: 4,
        category:  '4-star hotel',
        address: 'Fateh Sagar Rd, Near Zinc, Fateh Sagar Lake, Udaipur, Rajasthan 313004',
        convenienceFee: 1000,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTx8-MC5gTRWZAdo5BwL5iCdPZjug1ZSzR-Cg&usqp=CAU",
            "https://media-cdn.tripadvisor.com/media/photo-s/0e/a9/4d/60/best-wedding-venue-in.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUhjNI6iLfe02L9fi6p2LMP1ERwtjLphU6ww&usqp=CAU"
        ],
        latitude: 24.593963, longitude: 73.682730 
    },
    {
        id: 4,
        name: 'The Royal Retreat Resort & Spa',
        number: '091160 14964',
        price: `7800`,
        featured: true,
        rating: 4.7,
        category: '4.7-star hotel',
        address: 'Village-Hawala, Badi Hawala Rd, Udaipur, Rajasthan 313025',
        convenienceFee: 1000,
        images: [
            "https://media-cdn.tripadvisor.com/media/photo-s/09/40/6d/62/the-royal-retreat-resort.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/02/7c/89/28/filename-dsc02551-2-jpg.jpg",
            "https://c1.hiqcdn.com/customcdn/768x512/images/property/resortimg/8095_1.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-RfbD073pcNdtM-atJU6IV4u-PO5TaGToOg&usqp=CAU"
        ],
        latitude: 24.607070, longitude: 73.646215 
    }, 
]
