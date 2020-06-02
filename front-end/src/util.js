export const tempConverter = (isCelsius, temp) => {
  if (isCelsius) {
    return (temp - 273.15).toFixed(1);
  } else {
    return ((9 / 5) * (temp - 273) + 32).toFixed(1);
  }
};

export const weatherIcon = (weatherType) => {
  const uniqueIcons = [
    "Clear",
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Clouds",
  ];
  const icon = uniqueIcons.includes(weatherType) ? weatherType : "Atmosphere";
  return icon;
};
