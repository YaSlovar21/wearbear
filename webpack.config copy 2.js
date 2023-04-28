const path = require('path'); // подключаем path к конфигу вебпак
const {tis} = require('./tis');
const {rawData, razbegPoMoshnosti} = require('./raschets');
const {bpages} = require('./bpages');
const {rpages} = require('./rpages');

console.log(rawData);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const {paths} = require('./sitemap');

console.log('----------------------------------', paths.length, '----------------------------------');

//const faviconPath = 'src/images/favicon.svg';
const canonicalURL = 'https://www.utermo.ru'


function generateTiHtmlPlugins() {
  return tis.map(item => {
    return new HtmlWebpackPlugin({
      title: item.title ? item.title:  `Теплообменник пластинчатый разборный ${item.name}`,
      template: "./src/abstract-ti-page.html", // шаблон
      filename: item.fileName,
      templateParameters: {
        du: item.du,
        tialias: item.tiBaseImage,
        drawalias: item.tiDrawImage,
        heading: item.name,
        headingAlias: item.nameAlias,
        description: item.description ? item.description : "",
        link3d: item.link3d,
      },
      chunks: ["ti", "aside"],
    })
  })
};


function generateRaschetHtmlPlugins() {
  return rawData.map(ptoData => {
    return new HtmlWebpackPlugin({
      title: ptoData.title ? ptoData.title:  `Какой то расчёт`,
      template: "./src/abstract-raschet-page.html", // шаблон
      filename: `plastinchatye-teploobmenniki/raschets/${ptoData.path}.html`,
      templateParameters: ptoData,
      razbegPoMoshnosti,
      chunks: ["docs", "aside", "raschetitem"],
    })
  })
};

function generateArticleHtmlPlugins() {
  return bpages.map(articleData => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isPto: articleData.isPto,
        articleId: articleData.articleId,
        intro: articleData.intro,
      },
      title: articleData.title,
      heading: articleData.h1,
      meta: {
        keywords: articleData.keywords,
        description: articleData.description,
      },
      template: "./src/abstract-info-page.html",
      filename: articleData.fileName,
      chunks: ["infopage", "aside"],
    })
  })
};

const htmlTiPlugins = generateTiHtmlPlugins();
const htmlRaschetPlugins = generateRaschetHtmlPlugins();
const htmlArticlePlugins = generateArticleHtmlPlugins();

module.exports = {
  entry: {
    index: "./src/upages/index.js",
    aside: "./src/upages/aside.js",

    lppto: "./src/upages/lppto.js",
    lpbtp: "./src/upages/lpbtp.js",
    inforazdel: "./src/upages/info-razdel.js",

    equip: "./src/upages/uequipment.js",

    docs: "./src/upages/docs.js",
    spec: "./src/upages/special-article.js",
    raschetbytypes: "./src/upages/raschet-by-types.js",
    raschetitem: "./src/upages/raschet-item.js",
    ti: "./src/upages/ti.js",
    scheme: "./src/upages/scheme.js",
    infopage: "./src/upages/info-page.js",
    contacts: "./src/upages/contacts.js",

    mapsvg: "./src/upages/amap.js",
    searchdataform: "./src/upages/asearchdataform.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    assetModuleFilename: "images/[hash][ext]",
    //publicPath: ''
  },
  // добавили режим разработчика
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /favicon\.svg/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "",
            },
          },
        ],
      },
      /*{ // грузим инлайново из файлика шаблона страницы блога
       test: /\.html$/,
       include: [path.resolve(__dirname, './src/articles/')],
       loader: "html-loader"
      },*/
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        exclude: [
          path.resolve(__dirname, "./src/images/favicon.svg"),
          path.resolve(__dirname, "./src/blog-images/"),
          path.resolve(__dirname, "./src/insets/schemes/svg-schemes/"),
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
        include: [path.resolve(__dirname, "./src/insets/schemes/svg-schemes/")],
        options: {
          name: "itCanBeWhatever/[name].[ext]", // It does not have to follow same path or file name than files in 'src'
        },
      },
      {
        // загрузка документов в documents/
        test: /\.(doc|docx|pdf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "documents",
            },
          },
        ],
      },
      {
        test: /robots\.txt/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          // Добавьте postcss-loader
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: "Производство и поставка тепловых пунктов, теплообменников",
      meta: {
        keywords: "российское производство теплообменников",
        description: `ООО Термоблок - производитель пластинчатых теплообменников со 100% локализацией изготовление пластин, уплотнений и ряда комплектующих для теплообменников торговой марки Теплохит`,
      },
      template: "./src/index.html", // путь к файлу index.html
      chunks: ["index", "aside", "mapsvg"],
    }),
    /*---------LPPTO----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        items: tis,
        raschetsExamples: rawData,
      },
      title:
        "Пластинчатые теплообменники, производство полного цикла, для горячего водоснабжения, отопления, пищевые",
      meta: {
        keywords:
          "пластинчатые теплообменники, производство пластинчатых теплоомбенников",
        description:
          "100% локализация производства пластинчатых теплообменников: пластин, уплотнений, теплообменников. Выгодное предложение за счёт оптовой закупки металла и серийного производства пластин.",
      },
      template: "./src/lppto.html",
      filename: "plastinchatye-teploobmenniki/index.html",
      chunks: ["lppto", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro: "Примеры расчётов разборных пластинчатых теплообменников",
        items: tis,
        raschetsExamples: rawData,
        razbegPoMoshnosti,
      },
      title: "Примеры расчётов разборных пластинчатых теплообменников",
      heading: "Примеры расчётов разборных пластинчатых теплообменников",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/lppto-raschets.html",
      filename: "plastinchatye-teploobmenniki/raschets/index.html",
      chunks: ["spec", "aside", "searchdataform"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro:
          "Примеры пластинчатых теплообменников вода-вода. Теплообменники, подобранные под реальные задачи теплообмена.",
        raschetsExamples: rawData,
        relevance: rpages,
      },
      title: "Примеры расчётов водоводяных теплообменников",
      heading: "Водоводяные теплообменники",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/abstract-spec-raschets-page.html",
      filename: "plastinchatye-teploobmenniki/raschets/voda-voda/index.html",
      chunks: ["spec", "aside", "raschetbytypes"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro:
          "Примеры пластинчатых теплообменников пар-вода. Теплообменники пароводяные пластинчатые, подобранные под реальные задачи теплообмена.",
        raschetsExamples: rawData,
        relevance: rpages,
      },
      title:
        "Примеры расчётов теплообменников пар-вода, пароводяные пластинчатые",
      heading: "Пароводяные теплообменники",
      commentHead: 'Что вы найдете в расчётах пароводяных теплообменников?',
      comment:
        "На промышленных предприятиях в качестве теплоносителя часто используется пар. Как правило на таких предприятиях широко используются пароводяные пластинчатые теплообменники на различные задачи, такие как: нагрев системы ГВС;система отопления; нагрев воды для технологических нужд;нагрев воды для CIP-мойки. Теплообменники Теплохит хорошо подходят для нагрева воды паром. Максимальная рабочая температура пара +180 С. В расчётах вы найдёте наиболее распространенные температурные графики пароводяных теплообменников.",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/abstract-spec-raschets-page.html",
      filename:
        "plastinchatye-teploobmenniki/raschets/par-vodyanoy-voda/index.html",
      chunks: ["spec", "aside", "raschetbytypes"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro: "Примеры пластинчатых теплообменников для молока.",
        raschetsExamples: rawData,
        relevance: rpages,
      },
      title: "Примеры расчётов теплообменников для молока",
      heading: "Теплообменники для молока",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/abstract-spec-raschets-page.html",
      filename: "plastinchatye-teploobmenniki/raschets/dlya-moloka/index.html",
      chunks: ["spec", "aside", "raschetbytypes"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro: "Модельный ряд пластинчатых теплообменников",
        items: tis,
        raschetsExamples: rawData,
      },
      title: "Модельный ряд пластинчатых теплообменников",
      heading: "Модельный ряд пластинчатых теплообменников",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/lppto-models.html",
      filename: "plastinchatye-teploobmenniki/catalog/index.html",
      chunks: ["lppto", "spec", "aside"],
    }),

    /*---------РАСЧЁТ ПТО----------- */
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL },
      title: "Подбор и расчёт теплообменника пластинчатого онлайн форма",
      meta: {
        keywords:
          "пластинчатые теплообменники расчёт, пластинчатый теплообменник подбор",
        description:
          "Онлайн форма для подбора пластинчатого теплообменника. Предоставим расчёт теплообменного аппарата в течение 30 минут.",
      },
      template: "./src/uequipment.html",
      filename: "raschet-i-podbor-teploobmennika/index.html",
      chunks: ["equip", "aside"],
    }),
    /*---------РАСЧЁТ БТП----------- */
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL },
      title: "Расчет индивидуального теплового пункта",
      meta: {
        keywords: "расчёт теплового пункта, подбор блочного теплового пункта",
        description: "Онлайн форма для запроса на расчёт теплового пункта. Предоставим расчёт блочного теплового пункта в течение 1-2 дней.",
      },
      template: "./src/uequipment-btp.html",
      filename: "raschet-teplovogo-punkta/index.html",
      chunks: ["equip", "aside"],
    }),

    /*---------LPBTP-----------*/
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "Блочные тепловые пункты, тепловые узлы, модули итп",
      meta: {
        keywords: "блочные тепловые пункты, блочные итп, блочные тепловые узлы",
        description:
          "Блочные индивидуальные тепловые пуннкты: узлы и модули заводской готовности. Производство.",
      },
      template: "./src/lpbtp.html",
      filename: "blochnye-teplovye-punkty/index.html",
      chunks: ["aside", "lpbtp"],
    }),
    /*---------СХЕМЫ-----------*/
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Схемы блочных тепловых пунктов",
      heading: "Схемы блочных тепловых пунктов",
      intro:
        "Принципиальные схемы и модели тепловых пунктов в соответствии с которыми изготавливаются блочные итп. Схемы могут быть изменены индивидуально для заказчика.",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/schemes.html",
      filename: "blochnye-teplovye-punkty/schemes/index.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел ввода и учёта тепловой энергии УУТЭ",
      heading:
        "Принципиальная схема узла ввода и учёта тепловой энергии (УУТЭ)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/vvoda.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "vvoda",
      },
      chunks: ["scheme", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел системы отопления (независимая)",
      heading: "Принципиальная схема системы отопления (независимая)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/so-nezav.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "so-nezav",
      },
      chunks: ["scheme", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел системы отопления (зависимая)",
      heading: "Принципиальная схема системы отопления (зависимая)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/so-zav.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "so-zav",
      },
      chunks: ["scheme", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел системы гвс (одноступенчатая)",
      heading: "Принципиальная схема системы гвс (одноступенчатая)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/gvs-odn.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "gvs-odn",
      },
      chunks: ["scheme", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел системы гвс (двухступечатая)",
      heading: "Принципиальная схема системы гвс (двухступечатая)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/gvs-two-step.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "gvs-two-step",
      },
      chunks: ["scheme", "aside"],
    }),
    new HtmlWebpackPlugin({
      title: "Узел системы гвс с резервными теплообменниками",
      heading:
        "Принципиальная схема системы гвс (с резервными теплообменниками)",
      template: "./src/abstract-scheme-page.html", // шаблон
      filename: "blochnye-teplovye-punkty/schemes/gvs-reserve.html",
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "gvs-reserve",
      },
      chunks: ["scheme", "aside"],
    }),
    /*------------------------- 
    new HtmlWebpackInlineSVGPlugin(),*/
    /*--------------------------------------- */
    /* Проектировщикам */
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title:
        "Проектировщикам тепловых пунктов | Проектирование | по СП 41 101 95",
      heading: "Теплообменники для отопления",
      meta: {
        keywords: "проектировщикам теплового пункта",
        description:
          "Как подобрать пластинчатый теплообменник для отопления, особенности производства и применения. Онлайн форма для подбора теплообменника системы отопления.",
      },
      template: "./src/proektirovshchikam.html",
      filename: "blochnye-teplovye-punkty/proektirovshchikam/index.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, nameId: "poyasnit" },
      title: "Пояснительная записка к проекту теплового пункта",
      heading: "Пояснительная записка к проекту БТП",
      intro: "Пояснительная записка к проекту БТП",
      meta: {
        keywords: "пояснительная записка к проекту теплового пункта",
        description:
          "Составляющая коммерческое предложение по блочному тепловому пункту - пояснительная записка к проекту.",
      },
      template: "./src/proektirovshchikam-inner.html",
      filename:
        "blochnye-teplovye-punkty/proektirovshchikam/poyasnitelnaya-zapiska-k-proektu-teplovogo-punkta.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, nameId: "principial" },
      title: "Схема блочного теплового пункта в А3 формате",
      heading: "Принципиальная схема теплового пункта",
      intro: "в А3 формате",
      meta: {
        keywords: "схема теплового пункта",
        description:
          "Составляющая коммерческое предложение по блочному тепловому пункту - принципиальная схема теплового пункта.",
      },
      template: "./src/proektirovshchikam-inner.html",
      filename:
        "blochnye-teplovye-punkty/proektirovshchikam/principialnaya-skhema-teplovogo-punkta.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, nameId: "rasstanovka" },
      title:
        "Расстановка блоков на плане помещение теплового пункта и обвязка их трубопроводами",
      heading:
        "Расстановка блоков на плане помещения и обвязка их трубопроводами",
      intro:
        "Расстановка блоков на плане помещения и обвязка их трубопроводами",
      meta: { keywords: "", description: "" },
      template: "./src/proektirovshchikam-inner.html",
      filename:
        "blochnye-teplovye-punkty/proektirovshchikam/rasstanovka-blokov-teplovogo-punkta.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, nameId: "specif" },
      title: "Оборудование теплового пукнта | Спецификация индивидуального теплового пукнта",
      heading: "Спецификация оборудования, входящего в состав теплового пункта",
      intro: "Спецификация оборудования, входящего в состав теплового пункта",
      meta: { keywords: "", description: "" },
      template: "./src/proektirovshchikam-inner.html",
      filename:
        "blochnye-teplovye-punkty/proektirovshchikam/specifikaciya-oborudovaniya-teplovogo-punkta.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, nameId: "ptoandnasos" },
      title: "Насосы теплового пукнта и теплообменники в тепловом пукнте",
      heading: "Листы подбора теплообменников и насосов",
      intro: "Листы подбора теплообменников и насосов",
      meta: { keywords: "", description: "" },
      template: "./src/proektirovshchikam-inner.html",
      filename:
        "blochnye-teplovye-punkty/proektirovshchikam/listy-podbora-teploobmennikov-i-nasosov.html",
      chunks: ["spec", "aside"],
    }),
    /*
    /rasstanovka-blokov-teplovogo-punkta.html

    */
    /*---------Информационный раздел--------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "Новое в производстве пластинчатых теплообменников",
      meta: {
        keywords:
          "Информация о продукции предприятия: пластинчатых теплобменников для отопления, гвс; теплообменников пищевого назначения",
        description: "Все о Ютермо",
      },
      template: "./src/info-razdel.html",
      filename: "info/index.html",
      chunks: ["inforazdel", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "О нас",
      meta: {
        keywords: "",
        description: "Все о Ютермо",
      },
      template: "./src/info-about.html",
      filename: "about/index.html",
      chunks: ["inforazdel", "aside"],
    }),

    /*ДОКУМЕНТЫ х 3*/
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "catalogs",
        intro:
          "Каталоги пластинчатых теплообменников, блочных тепловых пунктов.",
      },
      title:
        "Каталоги теплообменного оборудования | Каталог пластинчатых теплобменников и тепловых пунктов",
      heading: "Каталоги теплообменного оборудования",
      meta: {
        keywords:
          "каталоги теплообменного оборудования, каталог блочных итп, каталог тепловых пунктов",
        description:
          "Скачать, посмотреть каталоги теплообменного оборудования, каталог пластинчатых теплобменников и тепловых пунктов",
      },
      template: "./src/abstract-docs-page.html",
      filename: "catalogs.html",
      chunks: ["docs", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "opros",
        intro: "Опросные листы для подбора теплообменного оборудования",
      },
      title:
        "Опросные листы теплообменного оборудования | Опросный пластинчатых теплобменников и тепловых пунктов",
      heading: "Опросные листы теплообменного оборудования",
      meta: {
        keywords:
          "каталоги теплообменного оборудования, каталог блочных итп, каталог тепловых пунктов",
        description:
          "Скачать, посмотреть каталоги теплообменного оборудования, каталог пластинчатых теплобменников и тепловых пунктов",
      },
      template: "./src/abstract-docs-page.html",
      filename: "oprosnye-listy-teploobmennogo-oborudovaniya.html",
      chunks: ["docs", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        nameId: "sert",
        intro: "Сертификаты на оборудование",
      },
      title: "Сертификация",
      heading: "Сертификаты",
      meta: {
        keywords: "сертификаты",
        description: "Сертификация теплообменного оборудования ЮТЕРМО",
      },
      template: "./src/abstract-docs-page.html",
      filename: "produkciya-sertificirovana.html",
      chunks: ["docs", "aside"],
    }),

    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "Контакты ООО Ютермо",
      meta: {
        keywords: "ооо ютермо, контакты",
        description:
          "Контакты фирмы Ютермо, производство теплообменников в городе Барнаул",
      },
      template: "./src/ucontacts.html",
      filename: "contacts.html",
      chunks: ["contacts", "aside", "mapsvg"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro: "Тепловые пукнкты для систем горячего водоснабжения (гвс одноступенчатая, гвс двухступенчатая схемы)",
      },
      title: "Тепловые пункты горячего водоснабжения гвс блочные",
      heading: "Блочные тепловые пукнты в системе горячего водоснабжения",
      meta: {
        keywords: "сертификаты",
        description: "Сертификация теплообменного оборудования ЮТЕРМО",
      },
      template: "./src/abstract-spec-razdel-page.html",
      filename: "info/teplovoy-punkt-goryachego-vodosnabzheniya-gvs.html",
      chunks: ["spec", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        intro: "Тепловые пукнкты для отопления (зависимая, независимая схемы)",
      },
      title: "Тепловые пункты отопления блочные",
      heading: "Блочные тепловые пункты для системы отопления",
      meta: {
        keywords: "сертификаты",
        description: "Сертификация теплообменного оборудования ЮТЕРМО",
      },
      template: "./src/abstract-spec-razdel-page.html",
      filename: "info/teplovoy-punkt-sistemy-otopleniya.html",
      chunks: ["spec", "aside"],
    }),

    /*new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "XML",
      template: "./src/ymltemplate.xml",
      filename: "yml.xml",
      inject: false,
    }),*/
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new SitemapPlugin({ base: canonicalURL, paths }),
  ].concat(htmlTiPlugins, htmlRaschetPlugins, htmlArticlePlugins),
};



    /*new HtmlWebpackPlugin({
      title: "Теплообменник ТИ025 пластинчатый разборный",
      template: "./src/abstract-ti-page.html", // шаблон
      filename: "catalog/ti-025.html",
      templateParameters: {
        tialias: "ti025.png",
        drawalias: "draw025.jpg",
        heading: "ТИ 025",
        headingAlias: "ТИ025",
        description: `ТИ025 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Применение: небольшие промышленные помещения, коттеджи, здания детских садов, подогрев бассейнов, обогрев гаражных помещений.`,
        link3d: "https://disk.yandex.ru/d/Lo1bdjAoi7LVyQ",
      },
      chunks: ["ti", "aside"],
    }),*/

        /*------- Статьи информационного раздела (удалятся) ------ 
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleId: "pto-snegotayanie",
      },
      title: "Теплообменники снеготаяния | Пластинчатые | Схема подключения",
      heading: "Теплообменники для снеготаяния",
      meta: {
        keywords:  "теплообменники отопления, пластинчатые теплообменники отопления",
        description: "Как подобрать пластинчатый теплообменник для отопления, особенности производства и применения. Онлайн форма для подбора теплообменника системы отопления.",
      },
      template: "./src/abstract-info-page.html",
      filename: "info/teploobmenniki-snegotayaniya.html",
      chunks: ["infopage", "aside"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleId: "advantage-plates",
      },
      title:
        "Преимущества пластинчатых теплообменников",
      heading: "Преимущества пластинчатых теплообменников",
      meta: {
        keywords:
          "теплообменники отопления, пластинчатые теплообменники отопления",
        description:
          "",
      },
      template: "./src/abstract-info-page.html",
      filename:
        "info/preimushchestva-plastinchatykh-teploobmennikov.html",
      chunks: ["infopage", "aside"],
    }),*/