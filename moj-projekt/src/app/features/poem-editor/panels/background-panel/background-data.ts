// background-data.ts

export const BACKGROUND_CATEGORIES = [
  // =====================================================
  // BACKGROUND IMAGE
  // =====================================================
  {
    name: 'background-image',
    label: '🖼️ Background Image',

    categories: [
      // =====================================================
      // KLASYCZNE
      // =====================================================
      {
        name: 'klasyczne',
        label: 'Klasyczne',

        colors: [
          {
            id: 101,
            name: 'Beżowy papier',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
          },

          {
            id: 102,
            name: 'Krem vintage',
            image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200',
          },

          {
            id: 103,
            name: 'Pergamin',
            image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200',
          },

          {
            id: 104,
            name: 'Old paper',
            image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200',
          },

          {
            id: 105,
            name: 'Coffee mood',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200',
          },

          {
            id: 106,
            name: 'Warm book',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
          },

          {
            id: 107,
            name: 'Vintage desk',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200',
          },

          {
            id: 108,
            name: 'Warm light',
            image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200',
          },

          {
            id: 109,
            name: 'Classic texture',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
          },

          {
            id: 110,
            name: 'Soft cream',
            image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=1200',
          },
        ],
      },

      // =====================================================
      // ROMANTYCZNE
      // =====================================================
      {
        name: 'romantyczne',
        label: 'Romantyczne',

        colors: [
          {
            id: 201,
            name: 'Różane płatki',
            image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200',
          },

          {
            id: 202,
            name: 'Pudrowy róż',
            image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200',
          },

          {
            id: 203,
            name: 'Flowers',
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200',
          },

          {
            id: 204,
            name: 'Love mood',
            image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200',
          },

          {
            id: 205,
            name: 'Pink sky',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
          },

          {
            id: 206,
            name: 'Rose light',
            image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200',
          },

          {
            id: 207,
            name: 'Lavender',
            image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200',
          },

          {
            id: 208,
            name: 'Romantic blur',
            image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200',
          },

          {
            id: 209,
            name: 'Soft flowers',
            image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200',
          },

          {
            id: 210,
            name: 'Warm roses',
            image: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?w=1200',
          },
        ],
      },

      // =====================================================
      // SEASONAL
      // =====================================================
      {
        name: 'seasonal',
        label: '🎄 Sezonowe',

        colors: [
          {
            id: 301,
            name: 'Christmas Lights',
            image: 'assets/bg/Sezonowe/zee.png',
            safeArea: {
              top: 120,
              right: 120,
              bottom: 140,
              left: 120,
            },
          },

          {
            id: 302,
            name: 'Christmas Tree',
            image: 'assets/bg/Sezonowe/zee2.png',
            safeArea: {
              top: 130,
              right: 120,
              bottom: 660,
              left: 120,
            },
            textStyle: {
              lineHeight: 1.1,
              fontSize: '0.9em',
            },
          },

          {
            id: 303,
            name: 'Snow winter',
            image: 'assets/bg/Sezonowe/zee3.png',
            safeArea: {
              top: 130,
              right: 120,
              bottom: 660,
              left: 120,
            },
            textStyle: {
              lineHeight: 1.1,
              fontSize: '0.9em',
            },
          },

          {
            id: 304,
            name: 'Warm Christmas',
            image: 'assets/bg/Sezonowe/zee4.png',
            safeArea: {
              top: 130,
              right: 120,
              bottom: 660,
              left: 120,
            },
            textStyle: {
              lineHeight: 1.1,
              fontSize: '0.9em',
            },
          },

          {
            id: 305,
            name: 'Halloween',
            image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=1200',
          },

          {
            id: 306,
            name: 'Dark forest',
            image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200',
          },

          {
            id: 307,
            name: 'Ghost mood',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
          },

          {
            id: 308,
            name: 'Easter flowers',
            image: 'https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?w=1200',
          },

          {
            id: 309,
            name: 'Spring',
            image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=1200',
          },

          {
            id: 310,
            name: 'Winter mood',
            image: 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?w=1200',
          },
        ],
      },
    ],
  },

  // =====================================================
  // BACKGROUND COLORS
  // =====================================================

  {
    name: 'background-colors',
    label: '🎨 Background Colors',

    categories: [
      // =====================================================
      // KLASYCZNE
      // =====================================================

      {
        name: 'klasyczne',
        label: 'Klasyczne',

        colors: [
          { id: 1, name: 'Beż', hex: '#c49a6c' },
          { id: 2, name: 'Krem', hex: '#f5e6cc' },
          { id: 3, name: 'Piaskowy', hex: '#e6d3a3' },
          { id: 4, name: 'Pergamin', hex: '#ede0c8' },
          { id: 5, name: 'Kawa', hex: '#6f4e37' },
          { id: 6, name: 'Brąz', hex: '#5a3e2b' },
          { id: 7, name: 'Taupe', hex: '#8d7b68' },
          { id: 8, name: 'Wanilia', hex: '#fff3cd' },
          { id: 9, name: 'Kość słoniowa', hex: '#f8f4e3' },
          { id: 10, name: 'Stary papier', hex: '#f1e3c6' },

          { id: 11, name: 'Latte', hex: '#c8ad7f' },
          { id: 12, name: 'Cappuccino', hex: '#b08968' },
          { id: 13, name: 'Karmel', hex: '#ddb892' },
          { id: 14, name: 'Piasek pustyni', hex: '#d2b48c' },
          { id: 15, name: 'Vintage cream', hex: '#f6f1eb' },
          { id: 16, name: 'Soft white', hex: '#f8f5f0' },
          { id: 17, name: 'Warm gray', hex: '#8b7d7b' },
          { id: 18, name: 'Coffee milk', hex: '#c4a484' },
          { id: 19, name: 'Dark mocha', hex: '#4a2c2a' },
          { id: 20, name: 'Mahogany', hex: '#5c4033' },

          { id: 21, name: 'Sepia', hex: '#704214' },
          { id: 22, name: 'Hazelnut', hex: '#8b5e3c' },
          { id: 23, name: 'Clay', hex: '#b66a50' },
          { id: 24, name: 'Bronze', hex: '#cd7f32' },
          { id: 25, name: 'Copper', hex: '#b87333' },
          { id: 26, name: 'Vintage gold', hex: '#c9a227' },
          { id: 27, name: 'Old brown', hex: '#6a4e42' },
          { id: 28, name: 'Soft black', hex: '#1a1a1a' },
          { id: 29, name: 'Graphite', hex: '#444444' },
          { id: 30, name: 'Ash gray', hex: '#b0b0b0' },

          { id: 31, name: 'Smoke', hex: '#d6d3d1' },
          { id: 32, name: 'Stone', hex: '#a8a29e' },
          { id: 33, name: 'Cream beige', hex: '#ede0d4' },
          { id: 34, name: 'Classic white', hex: '#faf9f6' },
          { id: 35, name: 'Ivory dark', hex: '#f0ead6' },
          { id: 36, name: 'Sandstone', hex: '#c2b280' },
          { id: 37, name: 'Wood', hex: '#966f33' },
          { id: 38, name: 'Oak', hex: '#a67b5b' },
          { id: 39, name: 'Brown sugar', hex: '#8b4513' },
          { id: 40, name: 'Chocolate', hex: '#3d1f1f' },

          { id: 41, name: 'Vintage gray', hex: '#9e9e9e' },
          { id: 42, name: 'Old silver', hex: '#c0c0c0' },
          { id: 43, name: 'Pearl', hex: '#f0ead6' },
          { id: 44, name: 'Warm sand', hex: '#e6ccb2' },
          { id: 45, name: 'Soft taupe', hex: '#bcaaa4' },
          { id: 46, name: 'Muted coffee', hex: '#7b5e57' },
          { id: 47, name: 'Warm cream', hex: '#fff8e7' },
          { id: 48, name: 'Paper white', hex: '#fdfcf7' },
          { id: 49, name: 'Antique', hex: '#faebd7' },
          { id: 50, name: 'Classic navy', hex: '#1e293b' },
        ],
      },

      // =====================================================
      // ROMANTYCZNE
      // =====================================================

      {
        name: 'romantyczne',
        label: 'Romantyczne',

        colors: [
          { id: 101, name: 'Róż', hex: '#e5a9a9' },
          { id: 102, name: 'Pudrowy róż', hex: '#fbcfe8' },
          { id: 103, name: 'Lawenda', hex: '#c4b5fd' },
          { id: 104, name: 'Fuksja', hex: '#d946ef' },
          { id: 105, name: 'Blady róż', hex: '#fce7f3' },
          { id: 106, name: 'Korale', hex: '#fb7185' },
          { id: 107, name: 'Wiśnia', hex: '#991b1b' },
          { id: 108, name: 'Rubin', hex: '#9f1239' },
          { id: 109, name: 'Liliowy', hex: '#e9d5ff' },
          { id: 110, name: 'Morela', hex: '#fb7185' },

          { id: 111, name: 'Rose gold', hex: '#b76e79' },
          { id: 112, name: 'Pink blush', hex: '#f4c2c2' },
          { id: 113, name: 'Soft lavender', hex: '#d8bfd8' },
          { id: 114, name: 'Lilac dream', hex: '#c8a2c8' },
          { id: 115, name: 'Pastel peach', hex: '#ffdab9' },
          { id: 116, name: 'Rosy brown', hex: '#bc8f8f' },
          { id: 117, name: 'Dusty rose', hex: '#d8a7b1' },
          { id: 118, name: 'Romantic coral', hex: '#ff7f7f' },
          { id: 119, name: 'Cherry blossom', hex: '#ffb7c5' },
          { id: 120, name: 'Pink cloud', hex: '#ffd1dc' },

          { id: 121, name: 'Soft plum', hex: '#8e4585' },
          { id: 122, name: 'Velvet pink', hex: '#c71585' },
          { id: 123, name: 'Dream violet', hex: '#9370db' },
          { id: 124, name: 'Mauve', hex: '#e0b0ff' },
          { id: 125, name: 'Rosewater', hex: '#f7cac9' },
          { id: 126, name: 'Warm blush', hex: '#ffb6b9' },
          { id: 127, name: 'Peony', hex: '#ff6f91' },
          { id: 128, name: 'Soft ruby', hex: '#aa336a' },
          { id: 129, name: 'Pink champagne', hex: '#f7e7ce' },
          { id: 130, name: 'Vintage pink', hex: '#c08081' },

          { id: 131, name: 'Berry', hex: '#a23e48' },
          { id: 132, name: 'Sweet pink', hex: '#ff69b4' },
          { id: 133, name: 'Orchid', hex: '#da70d6' },
          { id: 134, name: 'Soft magenta', hex: '#d87093' },
          { id: 135, name: 'Bubblegum', hex: '#ff77ff' },
          { id: 136, name: 'Light wine', hex: '#722f37' },
          { id: 137, name: 'Pastel lilac', hex: '#dcd0ff' },
          { id: 138, name: 'Bloom', hex: '#f8c8dc' },
          { id: 139, name: 'Rose petal', hex: '#fddde6' },
          { id: 140, name: 'Candy pink', hex: '#ff9ebb' },

          { id: 141, name: 'Purple haze', hex: '#b19cd9' },
          { id: 142, name: 'Violet smoke', hex: '#7f5f9a' },
          { id: 143, name: 'Rosé', hex: '#f4a6a6' },
          { id: 144, name: 'Sweet coral', hex: '#ff8c94' },
          { id: 145, name: 'Pink velvet', hex: '#d291bc' },
          { id: 146, name: 'Romance', hex: '#f9c5d1' },
          { id: 147, name: 'Purple romance', hex: '#b57edc' },
          { id: 148, name: 'Lilac sky', hex: '#dcd6f7' },
          { id: 149, name: 'Cream rose', hex: '#ffe4e1' },
          { id: 150, name: 'Dream pink', hex: '#ffc0cb' },
        ],
      },

      // =====================================================
      // NATURALNE
      // =====================================================

      {
        name: 'naturalne',
        label: 'Naturalne',

        colors: [
          { id: 201, name: 'Las', hex: '#14532d' },
          { id: 202, name: 'Mech', hex: '#4d7c0f' },
          { id: 203, name: 'Mięta', hex: '#6ee7b7' },
          { id: 204, name: 'Turkus ziemi', hex: '#0d9488' },
          { id: 205, name: 'Oliwka', hex: '#556b2f' },
          { id: 206, name: 'Kamień', hex: '#a8a29e' },
          { id: 207, name: 'Bursztyn', hex: '#f59e0b' },
          { id: 208, name: 'Miód', hex: '#fbbf24' },
          { id: 209, name: 'Leśna noc', hex: '#022c22' },
          { id: 210, name: 'Glina', hex: '#a16207' },

          { id: 211, name: 'Szałwia', hex: '#9caf88' },
          { id: 212, name: 'Forest green', hex: '#228b22' },
          { id: 213, name: 'Dark moss', hex: '#556b2f' },
          { id: 214, name: 'Pine', hex: '#01796f' },
          { id: 215, name: 'Jungle', hex: '#2e8b57' },
          { id: 216, name: 'Emerald leaf', hex: '#50c878' },
          { id: 217, name: 'Ocean stone', hex: '#4f6d7a' },
          { id: 218, name: 'Wet earth', hex: '#7f5539' },
          { id: 219, name: 'Bamboo', hex: '#789262' },
          { id: 220, name: 'Tea green', hex: '#d0f0c0' },

          { id: 221, name: 'Nature mint', hex: '#98ff98' },
          { id: 222, name: 'Pistachio', hex: '#93c572' },
          { id: 223, name: 'Leaf', hex: '#6b8e23' },
          { id: 224, name: 'Deep forest', hex: '#013220' },
          { id: 225, name: 'Wood bark', hex: '#5c4033' },
          { id: 226, name: 'Sand earth', hex: '#c2b280' },
          { id: 227, name: 'Stone gray', hex: '#928e85' },
          { id: 228, name: 'Rain forest', hex: '#355e3b' },
          { id: 229, name: 'Pale moss', hex: '#c7d59f' },
          { id: 230, name: 'Palm leaf', hex: '#3a5f0b' },

          { id: 231, name: 'Nature blue', hex: '#4682b4' },
          { id: 232, name: 'Arctic mint', hex: '#b8f2e6' },
          { id: 233, name: 'River stone', hex: '#708090' },
          { id: 234, name: 'Clay beige', hex: '#d2b48c' },
          { id: 235, name: 'Autumn leaf', hex: '#b5651d' },
          { id: 236, name: 'Evergreen', hex: '#05472a' },
          { id: 237, name: 'Lime grass', hex: '#7cfc00' },
          { id: 238, name: 'Green tea', hex: '#d0f0c0' },
          { id: 239, name: 'Dark cedar', hex: '#4b3621' },
          { id: 240, name: 'Sea moss', hex: '#4c956c' },

          { id: 241, name: 'Fern', hex: '#4f7942' },
          { id: 242, name: 'Natural sand', hex: '#e6d2aa' },
          { id: 243, name: 'Pebble', hex: '#b6b6b4' },
          { id: 244, name: 'Earth brown', hex: '#8b4513' },
          { id: 245, name: 'Golden moss', hex: '#ad9f00' },
          { id: 246, name: 'Olive smoke', hex: '#7e8f7c' },
          { id: 247, name: 'Pine cone', hex: '#6f4e37' },
          { id: 248, name: 'Misty forest', hex: '#5f7161' },
          { id: 249, name: 'Natural aqua', hex: '#5f9ea0' },
          { id: 250, name: 'Deep jungle', hex: '#1b4332' },
        ],
      },

      // =====================================================
      // NOWOCZESNE
      // =====================================================

      {
        name: 'nowoczesne',
        label: 'Nowoczesne',

        colors: [
          { id: 301, name: 'Neon fiolet', hex: '#a855f7' },
          { id: 302, name: 'Electric blue', hex: '#2979ff' },
          { id: 303, name: 'Neon cyan', hex: '#00e5ff' },
          { id: 304, name: 'Cyber green', hex: '#00ff9f' },
          { id: 305, name: 'Matrix green', hex: '#00ff41' },
          { id: 306, name: 'Hot red', hex: '#ff1744' },
          { id: 307, name: 'Glow orange', hex: '#ff9100' },
          { id: 308, name: 'Future purple', hex: '#6200ea' },
          { id: 309, name: 'Deep tech blue', hex: '#0d47a1' },
          { id: 310, name: 'Dark neon teal', hex: '#006064' },

          { id: 311, name: 'Cyber pink', hex: '#ff00ff' },
          { id: 312, name: 'Digital purple', hex: '#7b2cbf' },
          { id: 313, name: 'Neon lime', hex: '#b9fbc0' },
          { id: 314, name: 'Tech gray', hex: '#6c757d' },
          { id: 315, name: 'Graphite dark', hex: '#212529' },
          { id: 316, name: 'Dark UI', hex: '#111827' },
          { id: 317, name: 'AI Blue', hex: '#2563eb' },
          { id: 318, name: 'Vaporwave', hex: '#ff71ce' },
          { id: 319, name: 'Synthwave', hex: '#01cdfe' },
          { id: 320, name: 'Neon sunset', hex: '#ff5f6d' },

          { id: 321, name: 'Plasma', hex: '#ff00aa' },
          { id: 322, name: 'Ultra violet', hex: '#6a0dad' },
          { id: 323, name: 'Digital aqua', hex: '#00f5d4' },
          { id: 324, name: 'Hyper blue', hex: '#3a86ff' },
          { id: 325, name: 'Night mode', hex: '#121212' },
          { id: 326, name: 'OLED black', hex: '#000000' },
          { id: 327, name: 'Signal green', hex: '#39ff14' },
          { id: 328, name: 'Neon lava', hex: '#ff4d00' },
          { id: 329, name: 'Chrome silver', hex: '#c0c0c0' },
          { id: 330, name: 'Future cyan', hex: '#00ffff' },

          { id: 331, name: 'Laser pink', hex: '#ff1493' },
          { id: 332, name: 'Electric violet', hex: '#8f00ff' },
          { id: 333, name: 'Cyberpunk yellow', hex: '#fcee0a' },
          { id: 334, name: 'Acid green', hex: '#b0ff00' },
          { id: 335, name: 'Dark sapphire', hex: '#082567' },
          { id: 336, name: 'Quantum blue', hex: '#4361ee' },
          { id: 337, name: 'Future red', hex: '#ef233c' },
          { id: 338, name: 'Neon peach', hex: '#ff9770' },
          { id: 339, name: 'Modern steel', hex: '#71797e' },
          { id: 340, name: 'Digital smoke', hex: '#343a40' },

          { id: 341, name: 'RGB blue', hex: '#0057ff' },
          { id: 342, name: 'RGB green', hex: '#00ff66' },
          { id: 343, name: 'RGB red', hex: '#ff0033' },
          { id: 344, name: 'Future mint', hex: '#98ff98' },
          { id: 345, name: 'Dark mode purple', hex: '#2b1055' },
          { id: 346, name: 'Night neon', hex: '#00b4d8' },
          { id: 347, name: 'Glow berry', hex: '#c9184a' },
          { id: 348, name: 'Digital lavender', hex: '#bdb2ff' },
          { id: 349, name: 'Soft cyber', hex: '#72efdd' },
          { id: 350, name: 'Modern graphite', hex: '#2f3e46' },
        ],
      },
    ],
  },
];
