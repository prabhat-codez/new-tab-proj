// Cloudnary common links
const c = {
  one: "https://res.cloudinary.com/stylesh/image/upload",
  two: "nothing-new-tab/weather-icons",
}

const local = {
  clear_day: `${c.one}/v1733338463/${c.two}/mfjgk2jpos0lmngvx0cb.png`,
  clear_night: `${c.one}/v1733338462/${c.two}/qboki1bo9nhzfjzzhtqy.png`,
  cloudy_day: `${c.one}/v1733338461/${c.two}/daxtzh5zoynjei3bntao.png`,
  cloudy_night: `${c.one}/v1733338462/${c.two}/wbbkkoglowaxtubgatus.png`,
  fog_day: `${c.one}/v1733338462/${c.two}/nfideig9bnglm0bdfmtg.png`,
  hail_day: `${c.one}/v1733338461/${c.two}/po8syfoo7lkiekm74l1v.png`,
  haze_day: `${c.one}/v1733338461/${c.two}/uvifojpn7fn2iga8vo7c.png`,
  haze_night: `${c.one}/v1733338461/${c.two}/voqzrdbbtssuvhe9ifwc.png`,
  partly_cloudy_day: `${c.one}/v1733338461/${c.two}/uvifojpn7fn2iga8vo7c.png`,
  rain_day: `${c.one}/v1733338462/${c.two}/c70vhp9pf2me34rbpuuc.png`,
  sleet_day: `${c.one}/v1733338461/${c.two}/joyw8g8gsfmrrzpdovyy.png`,
  snow_day: `${c.one}/v1733338461/${c.two}/kfngmqs2sbbzxoffqetg.png`,
  thunder_day: `${c.one}/v1733338461/${c.two}/hnyp8fdf1ztfyx4sfpwn.png`,
  wind_day: `${c.one}/v1733338461/${c.two}/fjwlvpzbgusve4jz6kbn.png`,
}

export const icons = {
  weather_icons: {
    clear: { day: local.clear_day, night: local.clear_night },
    clouds: { day: local.cloudy_day, night: local.cloudy_day },
    rain: { day: local.rain_day, night: local.rain_day },
    drizzle: "",
    thunderstorm: { day: local.thunder_day, night: local.thunder_day },
    snow: { day: local.snow_day, night: local.snow_day },
    mist: { day: local.fog_day, night: local.fog_day },
    smoke: { day: local.fog_day, night: local.fog_day },
    haze: { day: local.haze_day, night: local.haze_night },
    dust: { day: local.fog_day, night: local.fog_day },
    fog: { day: local.fog_day, night: local.fog_day },
    sand: { day: local.fog_day, night: local.fog_day },
    ash: { day: local.fog_day, night: local.fog_day },
    squall: "",
    tornado: "",
  },
}
