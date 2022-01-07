const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
  hour12: false,
  timeZoneName: "short",
});

module.exports = {
  dateTimeFormat,
};
