import { Box } from "@mui/material";

  const Items = [
    { name: 'Electronics', image: 'https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100' },
    { name: 'Food', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/cereal-flake/g/y/y/300-fitbhim-oats-ready-to-eat-breakfast-complete-family-original-imahby8musmdbnza.jpeg?q=70' },
    { name: 'Beauty', image: 'https://m.media-amazon.com/images/I/71d9avk-dAL._SX240_QL100_AC_SCLZZZZZZZ_.jpg' },
    { name: 'Furniture', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1pG20i1X-k5Wgx55KrXKt_H6CR8vf2Ez5w&s' },
    { name: 'Clothes', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF1-186-116._SY116_CB636048992_.jpg' },
    { name: 'Books', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBR-mt0e0QdDEe__7ET2yrGm9btSJpFNX-9JX49DgtuAYsibU3c3K2tiN46nxEqN4wGYNtVwImbCbA9FLHn6zD_1lh4rZfO2FR2jAgV3WqK7SZQvoTYmPR' },
    // { name: 'Sports', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sports-shoe/3/6/4/-original-imagk7z5g3h9f8zj.jpeg?q=70' },
    { name: 'Toys', image: 'https://rukminim2.flixcart.com/image/240/240/kzegk280/action-figure/9/v/t/3-30155-mcfarlane-2-5-original-imagbeyyzehpyk2m.jpeg?q=60' },
  ];


export default function CategorySection() {
  return (
      <Box className="category">
        <div className="category-card">
          {Items.map((item) => (
            <div className="category-item" key={item.name}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </Box>

  );
}
