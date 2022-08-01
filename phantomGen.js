const fs = require("fs");

const createMetaData = () => {
  for (var i = 0; i < 100; i++) {
    let tempMetadata = {
      name: `Phantom #${i}`,
      description: `Born from the community, they are the passionate ones that stepped up to be at the forefront of our vision and what we stand for.`,
      image: `https://assets.pxn.app/phantom/reveal.png`,
    };
    fs.writeFileSync(`output/${i}.json`, JSON.stringify(tempMetadata, null, 2));
  }

};

createMetaData();
