export default {
  application: {
    title: 'Meshhouse application',
    lead: 'Meshhouse - open-source 3D catalogizer program, built with Electron. <b>100% optional</b>',
    featureTitle: 'Features:',
    featureList: "<li><p class='mb-0'>Meshhouse integration*</p></li><li><p class='mb-0'>Adding custom catalogs (grid and table view)</p></li><li><p class='mb-0'>Filter through your models collection</p></li><li><p class='mb-0'>Localization support</p></li>",
    note: '* - currently not implemented.',
    platforms: 'Supported platforms:',
    platformWin: 'Windows 7-10 (x64 only)',
    platformMac: 'MacOS 10.10 Yosemite and newer',
    platformLinux: 'Ubuntu 12.04, Fedora 21, Debian 8 and newer',
    localize: 'Localizations:',
    status: 'Currently in development, but you can build application by own:',
    link: 'Github repo',
    download: {
      windows: 'Download for Windows 7-10 x64 ({{version}})',
      mac: 'Download for MacOS 10.10 - 10.15 ({{version}})',
      linux: 'Download for Linux AppImage ({{version}})'
    }
  },
  common: {
    language: 'Language',
    contactLink: 'Contact us'
  },
  navigation: {
    home: 'Home',
    modelsCatalog: 'Models catalog',
    modelsAll: 'All models',
    howto: 'How to use models',
    tos: 'Terms of service',
    dmca: 'DMCA policy',
    privacyPolicy: 'Privacy policy',
    application: 'Application',
    contactUs: 'Contact info',
    news: 'News'
  },
  pages: {
    index: {
      meta: {
        title: 'Meshhouse - free 3D models for commercial use'
      },
      features: {
        readytouse: {
          title: 'Ready to use models',
          text: "In order to use our models, you don't need to put in a lot of effort to clear unnecessary objects from the scene. Just download the model in the required format, download the textures (if necessary), and insert into the scene.",
          note: 'Some models should be adapted to your model, such as clothing.'
        },
        free: {
          title: 'Completely free',
          text: 'All models distributed on our website are completely free. Including for commercial use (films, games, etc.)'
        },
        opensource: {
          title: 'Open source',
          text: 'We provide sources of this site and also sources of our application in our GitHub repository. This means that anyone can check for tracking scripts and other backdoors.'
        }
      },
      thematicBlock: {
        title: 'Thematic selections'
      },
      programs: {
        title: 'Available extensions',
        note: 'Some models can be presented only in one of the presented formats - this is due to the fact that the models are laid out gradually, as well as the need to convert between formats.',
        max: '3ds Max 2016 and newer',
        maya: 'Maya 2016 and newer',
        blender: 'Blender 2.8 and newer',
        cinema4d: 'Cinema4D R20 and newer',
        unity: 'Unity 2019.3 and newer',
        unreal: 'Unreal Engine 4.20 and newer'
      }
    }
  }
}
