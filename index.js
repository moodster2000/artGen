const fs = require("fs");
const { parse } = require("csv-parse");

const hair = [];
const hairData = fs.createReadStream(`traitHair.csv`);
hairData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  hair.push(row);
});
const body = []
const bodyData = fs.createReadStream(`traitBody.csv`);
bodyData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  body.push(row);
});

const acchead = []
const accheadData = fs.createReadStream(`traitAccHead.csv`);
accheadData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  acchead.push(row);
});

const accbody = []
const accbodyData = fs.createReadStream(`traitAccBody.csv`);
accbodyData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  accbody.push(row);
});

const eyes = []
const eyesData = fs.createReadStream(`traitEyes.csv`);
eyesData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  eyes.push(row);
});

const mouth = []
const mouthData = fs.createReadStream(`traitMouth.csv`);
mouthData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  mouth.push(row);
});

const stickerR = []
const stickerRData = fs.createReadStream(`traitStickerR.csv`);
stickerRData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  stickerR.push(row);
});

const stickerL = []
const stickerLData = fs.createReadStream(`traitStickerL.csv`);
stickerLData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  stickerL.push(row);
});


const scent = []
const scentData = fs.createReadStream(`traitScent.csv`);
scentData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  scent.push(row);
});

const fusion = []
const fusionData = fs.createReadStream(`traitFusion.csv`);
fusionData.pipe(parse({ delimiter: "," })).on("data", function (row) {
  fusion.push(row);
});


const addMetadata = (DNA) => {
  let attributesList = [];
  let hairVal = getHairTrait(DNA[1].substring(1));
  let bodyVal = getBodyTrait(DNA[2].substring(1));
  let accHead = getAccHead(DNA[3]);
  let accBody = getAccBody(DNA[4]);
  let eyes = getEyes(DNA[5].substring(1));
  let mouth = getMount(DNA[6].substring(1));
  let stickerR = getStickerR(DNA[7].substring(1));
  let stickerL = getStickerL(DNA[8].substring(1));
  let scentVal = getScent(DNA[9]);
  let fusionVal = getFusion(DNA[10]);
  console.log(fusionVal, "over here")

  attributesList.push({
    trait_type: "Hair",
    value: hairVal[0],
  },{
    trait_type: "Body",
    value: bodyVal[0],
  },{
    trait_type: "HeadAccessory",
    value: accHead,
  },{
    trait_type: "BodyAccessory",
    value: accBody,
  },{
    trait_type: "StickerLeft",
    value: stickerL[0],
  },{
    trait_type: "StickerRight",
    value: stickerR[0],
  },{
    trait_type: "Eyes",
    value: eyes[0],
  },{
    trait_type: "Mouth",
    value: mouth[0],
  },{
    trait_type: "Scent",
    value: scentVal,
  },{
    trait_type: "Fusion",
    value: fusionVal,
  });

  let tempMetadata = {
    name: `RiceDay #${DNA[0]}`,
    image: `https://storage.googleapis.com/updatedimages/images/RiceDay%20(${DNA[0]}).jpg`,
    attributes: attributesList,
  };
  return tempMetadata;
};

const getHairTrait = (hairValue) => {
  return hair[hairValue];
};

const getBodyTrait = (bodyValue) => {
  return body[bodyValue];
};

const getAccHead = (accHeadValue) => {
  for(var i = 0; i < acchead.length; i++) {
    if(acchead[i][0] == accHeadValue) {
       return acchead[i][1];
    }
  }
};

const getEyes = (eyeValue) => {
  return eyes[eyeValue];
};

const getMount = (mouthValue) => {
  return mouth[mouthValue];
};

const getStickerR = (stickerValue) => {
  return stickerR[stickerValue];
};

const getStickerL = (stickerValue) => {
  return stickerL[stickerValue];
};

const getAccBody = (accBodyValue) => {
  for(var i = 0; i < accbody.length; i++) {
    if(accbody[i][0] == accBodyValue) {
       return accbody[i][1];
    }
  }
};

const getScent = (scentValue) => {
  for(var i = 0; i < scent.length; i++) {
    if(scent[i][0] == scentValue) {
       return scent[i][1];
    }
  }
};

const getFusion = (fusionValue) => {
  console.log(fusionValue, "fusion value")
  for(var i = 0; i < fusion.length; i++) {
    if(fusion[i][0] == fusionValue) {
      console.log(fusion[i][1])
       return fusion[i][1];
    }
  }
};

const createMetaData = () => {
  fs.createReadStream("./MetadataTest.csv")
    .pipe(parse({ delimiter: ","}))
    .on("data", function (row) {
      console.log(row)
      var metaData = addMetadata(row);
      fs.writeFileSync(
        `output/${row[0]}`,
        JSON.stringify(metaData, null, 2)
      );
    });
};

createMetaData();
