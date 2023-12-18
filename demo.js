

const data = [];
const search = '';
const selectedValue = '';


data?.filter((item) => {
    return item?.listing_name?.match(search) || item?.rListingCategories?.category_name?.match(search) 
})

$userData=data.map((i) => {
    `${i.listing.name} at ${i.location}`
})

