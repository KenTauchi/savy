require("dotenv").config();
const fetch      = require("node-fetch");
const { savyDb, savyPoolDb } = require("../connection.js");


// Returns a list of all Materials
exports.getMaterial = (req, res) => {
    let qry = `SELECT "material" AS type, m.materialId AS id, m.name AS materialName
                 FROM material m 
                UNION  
               SELECT "family" AS type, f.familyId AS id, f.name AS materialName
                 FROM family f 
                WHERE EXISTS ( SELECT 1 FROM material m WHERE m.familyId = f.familyId )
                ORDER BY materialName   `;
  
    savyPoolDb.then(pool =>{
      pool.query(qry)
          .then(results => {
              if (results.length == 0) {
                res.status(404).send("No Record Found");
              } else {
                res.status(200).send(results);
              }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send(error);
          })
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    }); 
};
              
            



  // Search a location for a material
exports.search = (req, res) => {
    let mySearch = async (req) => {

      // Escape input parameters
      let zipCodeCordinate = { latitude:  savyDb.escape(req.query.latitude).replace(/['']+/g, ''),    
                               longitude: savyDb.escape(req.query.longitude).replace(/['']+/g, '') }; 
      let sFilterRange   = savyDb.escape(req.query.filterRange).replace(/['']+/g, '');
      let sDistanceRange = savyDb.escape(req.query.range).replace(/['']+/g, '');         
      let sZipCode       = savyDb.escape(req.query.zipCode).replace(/['']+/g, '');                                
      let sMaterialId    = savyDb.escape(req.query.materialId).replace(/['']+/g, '');        
      let sFamilyId      = savyDb.escape(req.query.familyId).replace(/['']+/g, '');              

      // Get cordinates from ZipCode
      if (sFilterRange.toLowerCase() == "true" && sZipCode != "" && sZipCode.toLowerCase() != "null") {

        // PROMISE to get ZipCode cordinates Before executing mySql query
        let getMyCordinateAPI = new Promise((resolve, reject) => {

            // OLD api.zip-codes.com 
            //let zipCodeApiKey = process.env.ZIPCODE_API_PASS;    
            //let zipCode = `${req.query.zipCode}`; // `V6B1B4`;
            //let zipCodeApi = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/${zipCode}?key=${zipCodeApiKey}`;

            // Canada Gov new API
            let zipCodeApi = `http://geogratis.gc.ca/services/geolocation/en/locate?q=${sZipCode}`;
          
            //console.log(zipCodeApi);

            fetch(zipCodeApi).then((res) => {
              res.json().then((data) => {
                if (data.err) {
                  console.log(data.err);
                  reject({});
                } else {
                  // NEW Canada api  
                  resolve({ longitude: data[0].geometry.coordinates[0], latitude: data[0].geometry.coordinates[1] });

                  // OLD api.zip-codes.com                       
                  //resolve({ latitude: data.Latitude, longitude: data.Longitude });
                }
              })
              .catch(error => {
                console.log(error);
                reject({});                    
              }); 
            }) 
            .catch(error => {
              console.log(error);
            }); 
        });

        zipCodeCordinate = await getMyCordinateAPI; // wait until the promise resolves (*)
      }

      //console.log(`Finish Promise Zip`);
  
      // Initialize default values
      let sOrigin      = "";
      let sRangeFilter = "";
      let zipCodeRange = `20`;                     // default kilometers for range search
      let sDistance    = ` null AS distance `;     // default doesn't have origin cordinates
      let sWhere       = " WHERE 1=1";             // + sApiFilter;
  
      // Material and Family Parameters
      if (sMaterialId != "" && sMaterialId.toLowerCase() != "null") {
        sWhere = sWhere + ` AND m.materialId = ${sMaterialId} `;
        sOrigin = ` "material" AS origin, m.name AS material, m.description, m.imageUrl AS materialImageUrl, m.imageName AS materialImageName, m.deliveryNotes, `;
      } else {
        if (sFamilyId != "" && sFamilyId.toLowerCase() != "null") {
          sWhere = sWhere + ` AND f.familyId = ${sFamilyId} `;
          sOrigin = ` "family" AS origin, f.name AS material, f.description, f.imageUrl AS materialImageUrl, f.imageName AS materialImageName, f.deliveryNotes, `;
        }
      }
  
      // Range Filter Parameters
      if (sFilterRange != undefined && sFilterRange == "true") {
        if (sDistanceRange != undefined && sDistanceRange > 0) {
          zipCodeRange = sDistanceRange;
        }
        sRangeFilter = ` HAVING distance <= ${zipCodeRange} `;
      }
  
      // Distance function Parameters - result in kilometers
      if (
        zipCodeCordinate.latitude != undefined &&
        zipCodeCordinate.longitude != undefined
      ) {
        sDistance = ` round(ST_Distance_Sphere( point(l.longitude, l.latitude), point(${zipCodeCordinate.longitude}, ${zipCodeCordinate.latitude}) ) * .000621371192 * 1.60934, 1) AS distance `;
      }
  
      // Set query statement
      let qry = `SELECT DISTINCT 
                            ${sOrigin} 
                            f.name AS familyName, f.recyclingFact, l.locationId, l.distance,   
                            b.color AS binColor, b.name As binName, b.description AS binDescription,                
                            l.name AS location, c.name AS city, c.provinceCode, l.postalCode, l.address, l.phone, l.latitude, l.longitude, 
                            l.openningHour, l.website, l.imageUrl, l.locationNotes, om.family_name as otherMaterial 
                       FROM family f  
                            INNER JOIN material m ON (f.familyId = m.familyId)
                            INNER JOIN materialperlocation ml ON (m.materialId = ml.materialId)
                            INNER JOIN ( SELECT l.*, ${sDistance}
                                           FROM location l
                                         ${sRangeFilter} 
                                       ) l ON (ml.locationId = l.locationId)
                            INNER JOIN city c ON (l.cityId = c.cityId)
                            INNER JOIN provinces p ON (c.provinceCode = p.provinceCode AND c.countryCode = p.countryCode) 
                            INNER JOIN (
                                         SELECT f.familyId, m.materialId, l.locationId, 
                                                f.name AS family_name, m.name as material_name
                                           FROM family f  
                                                INNER JOIN material m ON (f.familyId = m.familyId)
                                                INNER JOIN materialperlocation ml ON (m.materialId = ml.materialId)
                                                INNER JOIN location l ON (ml.locationId = l.locationId ) 
                                        ) om ON ( om.locationId = l.locationId AND om.familyId <> f.familyId )
                            LEFT JOIN bin b ON (m.binId = b.binId)                                         
                      ${sWhere}      
                      ORDER BY distance, location, locationId, otherMaterial                         
                     `;
  
      //console.log(`SQL QUERY -----------------------`);
      //console.log(qry);
  
      savyPoolDb.then(pool =>{
        pool.query(qry)
            .then(results => {
                if (results.length == 0) {
                  res.status(404).send("No Record Found");
                } else {

                  let myResult = [];
                  let myLocation = [];
                  let otherMaterials = [];
                  let material = {};
                  let location = {};
                  let iLocationId = -1;
          
                  material = {
                    origin: results[0].origin,
                    materialName: results[0].material,
                    familyName: results[0].familyName,
                    description: results[0].description,
                    imageUrl: results[0].materialImageUrl,
                    imageName: results[0].materialImageName,
                    deliveryNotes: results[0].deliveryNotes,
                    recyclingFact: results[0].recyclingFact,
                    binName: results[0].binName,
                    binColor: results[0].binColor,
                    binDescription: results[0].binDescription
                  };
          
                  let i = 0;
                  while (i < results.length) {
                    otherMaterials = [];
                    iLocationId = results[i].locationId;
          
                    location = {
                      locationName: results[i].location,
                      city: results[i].city,
                      provinceCode: results[i].provinceCode,
                      postalCode: results[i].postalCode,
                      address: results[i].address,
                      phone: results[i].phone,
                      latitude: results[i].latitude,
                      longitude: results[i].longitude,
                      distance: results[i].distance,
                      openningHour: results[i].openningHour,
                      website: results[i].website,
                      openningHour: results[i].openningHour,
                      imageUrl: results[i].imageUrl,
                      locationNotes: results[i].locationNotes,
                    };
                    while (i < results.length && iLocationId == results[i].locationId) {
                      var isMaterial = otherMaterials.find(o => o.materialName === results[i].otherMaterial);
                      if (isMaterial == undefined) {
                        otherMaterials.push({ materialName: results[i].otherMaterial });
                      }
                      i++;
                    }
                    myLocation.push({
                      locationInfo: location,
                      otherMaterials: otherMaterials,
                    });
                  }
          
                  myResult.push({ material, locations: myLocation });
          
                  res.status(200).send(myResult);
                }
            })
            .catch(error => {
              console.log(error);
              res.status(500).send(error);
            })
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      }); 

  };

  mySearch(req);  

};
                
          









//--------------------------------------------------------------------------------
// DISCONTINUED - Promise to get where clause for filtering lcation data
// -------------------------------------------------------------------------------
//     let getZipCodeAPI = new Promise((resolve, reject) => {

//         let zipCodeApiKey         = `C3TxsgWGYzdRIPOlk1yaRoyLPTJrSojipPbYtQy51B55BSm3LxMxVUCNfab95sKE`;
//         let zipCodeLatitude       =  `${zipCodeCordinate.latitude}`;  // `49.279750`;
//         let zipCodeLongitude      =  `${zipCodeCordinate.longitude}`; // `-122.967925`;
//         let zipCodeLatitudeField  = `l.latitude`;
//         let zipCodeLongitudeField = `l.longitude`;
//         let zipCodeRange          = `20`;  // default kilometers for range search
//         if ((req.query.range != undefined) && (req.query.range > 0)) {
//             zipCodeRange          = `${req.query.range}`;
//         }

//         let zipCodeApi = `https://www.zipcodeapi.com/rest/${zipCodeApiKey}/radius-sql.json/${zipCodeLatitude}/${zipCodeLongitude}/degrees/${zipCodeRange}/km/${zipCodeLatitudeField}/${zipCodeLongitudeField}/2`

//         fetch(zipCodeApi)
//         .then((res) => {
//             res.json().then((data) => {
//                 if (data.err) {
//                     console.log(err);
//                     reject (``);
//                 } else {
//                     resolve (` AND ${data.where_clause} `);
//                 }
//             })
//         })
//     });

//     sApiFilter = await getZipCodeAPI; // wait until the promise resolves (*)

