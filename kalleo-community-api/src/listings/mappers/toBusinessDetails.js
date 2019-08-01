const toBusinessDetails = ({
  name,
  address,
  location = {},
}) => ({
  businessDetails: {
    name,
    location: {
      address,
      city: location.city || null,
      administrativeArea: location.state || null,
      postalCode: location.zip || null,
      country: location.country || null,
      latitude: location.geo && location.geo.latitude,
      longitude: location.geo && location.geo.longitude,
    },
  },
});

export default toBusinessDetails;
