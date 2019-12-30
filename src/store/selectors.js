export function getAd(ads, idAd) {
    console.log(ads);
    return ads.filter(ad => ad._id === idAd);
}

