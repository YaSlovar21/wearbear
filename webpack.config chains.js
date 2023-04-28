const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

const { gruzTsepCategoryPages } = require('./gost191-82');
const { mCategoryPages, gostInfo } = require('./gost588-81');

const { generatedChains } = require('./chains');
const { generatedSpecChains } = require('./chains-spec');

console.log(generatedChains);
console.log(generatedSpecChains);

const canonicalURL = 'https://барнаулцепь.рф'
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const {paths} = require('./sitemap');
const { title } = require('process');

console.log('----------------------------------', paths.length, '----------------------------------');
console.log('-----------------CHAINS-GENEGATED', generatedChains.length + generatedSpecChains.length , '----------------------------------');

const tipDictionary = {
  '1' : 'втулочная',
  '2' : 'роликовая',
  '3' : 'катковая',
  '4' : 'катковая с ребордой',
}

const ispDictionary = {
  '1' : 'неразборная',
  '2' : 'разборная',
  '3' : 'с полыми валиками',
}

const popularMmcChains = [
  {
    rel: 'm112',
    alias: 'm112-1-100-1',
    name: 'М112-1-100-1',
    desc: `Втулочная тяговая пластичнатая цепь М112 шагом 100 мм.`,
  },
  {
    rel: 'm112',
    alias: 'm112-2-100-1',
    name: 'М112-2-100-1',
    desc: `Роликовая тяговая пластинчатая цепь М112 шагом 100 мм.`,
  },
  {
    rel: 'm315',
    alias: 'm315-2-160-2',
    name: 'М315-2-160-2',
    desc: `Роликовая тяговая пластинчатая цепь М315 (нагрузка 315 kH).`,
  },/*
  {
    alias: 'm112-2-100-1',
    name: '',
    desc: ``,
  }
*/
]
/*
function filterObjectsById(arr, mCategoryId) {
  return arr.filter(obj => obj.relevanceChain === mCategoryId);
}*/

function filterObjectsById(arr, key, targetValue) {
  return arr.filter(obj => obj[key] === targetValue);
}

function generateGruzItemsHtmlPlugins() {
  return gruzTsepCategoryPages.map(gruzItem => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        tsepGruzId: gruzItem.tsepGruzId,
      },
      title: gruzItem.title,
      heading: gruzItem.h1,
      meta: {
        keywords: gruzItem.keywords,
        description: gruzItem.description,
      },
      template: "./src/tsepi-gruz-item.html",
      filename: gruzItem.fileName,
      chunks: ['index'],
    })
  })
};

function generateMmcCategoriesHtmlPlugins() {
  return mCategoryPages.map(mCategoryItem => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        mCategoryId: mCategoryItem.mCategoryId,
        generatedChainsFiltered: filterObjectsById(generatedChains, 'relevanceChain', mCategoryItem.mCategoryId),
        mCategoryLinkPath: mCategoryItem.fileName.split('/index.html')[0],
        specChains: generatedSpecChains.filter(item => item.relCategory === mCategoryItem.mCategoryId),
        gostInfo: gostInfo[mCategoryItem.mCategoryId],
        name: mCategoryItem.name,

        tipDictionary: tipDictionary,
        ispDictionary: ispDictionary,
      },
      title: mCategoryItem.title,
      heading: mCategoryItem.h1,
      meta: {
        keywords: mCategoryItem.keywords,
        description: mCategoryItem.description,
      },
      template: "./src/tsepi-m-mc-category.html",
      filename: mCategoryItem.fileName,
      chunks: ['index'],
    })
  })
};

function generateMmcItemsHtmlPlugins() {
  return generatedChains.map(chain => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        mCategoryId: chain.relevanceChain,
        tipDictionary: tipDictionary,
        ispDictionary: ispDictionary,
        chainInfo: chain,
        specChains: generatedSpecChains.filter(item => item.relChain === chain.alias)
      },
      title: `Цепь ${chain.name} тяговая пластинчатая`,
      heading: `Цепь ${chain.name}`,
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/tsepi-m-mc-item.html",
      filename: `prom-chains/tsepi-m-mc/${chain.relevanceChain}/${chain.alias}.html`,
      chunks: ['index'],
    })
  })
}

function generateMSpecItemsHtmlPlugins() {
  return generatedSpecChains.map(specchain => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        chainInfo: specchain,
        tipDictionary: tipDictionary,
        ispDictionary: ispDictionary,
        mCategoryId: specchain.relCategory,
      },
      title: `Цепь ${specchain.name} специальная тяговая пластинчатая`,
      heading: `Цепь ${specchain.name}`,
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/tsepi-m-spec-item.html",
      filename: `prom-chains/tsepi-m-mc/${specchain.relCategory}/${specchain.alias}.html`,
      chunks: ['index'],
    })
  })
}

const gruzItemsHtmlPlugins = generateGruzItemsHtmlPlugins();
const mCategoriesPages = generateMmcCategoriesHtmlPlugins();
const mItemsPages = generateMmcItemsHtmlPlugins();
const mSpecPages = generateMSpecItemsHtmlPlugins();

module.exports = {
  entry: { 
    index: './src/kpages/index.js',
    constrtyag: ['@babel/polyfill', './src/kpages/constructor.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[name][ext]',
    //publicPath: ''
  },
    // добавили режим разработчика
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
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
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        
        exclude: [
          path.resolve(__dirname, "./src/images/favicon.svg"),
        ],
      },
      {
        test: /\.css$/,
        // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        gruzTsepCategoryPages,
        popularMmcChains,
        specChains: generatedSpecChains.sort((a,b) => a.sortId - b.sortId).slice(0, 7),
        //specChains: generatedSpecChains.slice(0, 6),
      },
      template: './src/index.html', // путь к файлу index.html
      chunks: ['index'],
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Промышленные цепи',
      template: './src/prom-chains.html',
      chunks: ['index'],
      filename: "prom-chains/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pr",
      },
      title: 'Цепи приводные роликовые ГОСТ 13568-97 однорядные, многорядные',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "mmc",
      },
      title: 'Цепи тяговые пластинчатые ГОСТ 588-81',
      template: './src/tsepi-m-mc.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-m-mc/index.html",
    }),

    /* ВТУЛОЧНЫЕ--РОЛИКОВЫЕ--КАТКОВЫЕ */

    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        generatedChainsFiltered: filterObjectsById(generatedChains, 'tip', '1'),
        tip: '1',
        tipDictionary: tipDictionary,
        breadcrumbsHere: 'Втулочные',
      },
      title: 'Цепи тяговые пластинчатые втулочные',
      heading: 'Цепи тяговые пластинчатые втулочные',
      template: './src/tsepi-m-mc-types.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-vtulochnye/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        generatedChainsFiltered: filterObjectsById(generatedChains, 'tip', '2'),
        tip: '2',
        tipDictionary: tipDictionary,
        breadcrumbsHere: 'Роликовые',
      },
      title: 'Цепи тяговые пластинчатые роликовые',
      heading: 'Цепи тяговые пластинчатые роликовые',
      template: './src/tsepi-m-mc-types.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-rolikovye/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        generatedChainsFiltered: filterObjectsById(generatedChains, 'tip', '3'),
        tip: '3',
        tipDictionary: tipDictionary,
        breadcrumbsHere: 'Катковые',
      },
      title: 'Цепи тяговые пластинчатые катковые',
      heading: 'Цепи тяговые пластинчатые катковые',
      template: './src/tsepi-m-mc-types.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-katkovye/index.html",
    }),

    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Цепи грузовые пластинчатые ГОСТ 191-82',
      template: './src/tsepi-gruz.html',
      chunks: ['index'],
      filename: "prom-chains/gruz-tsepi/index.html",
    }),
    /*
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "m112",
      },
      title: 'Цепь М112 тяговая пластинчатая',
      template: './src/tsepi-m-mc.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-m-mc/m112/index.html",
    }),*/
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Конструкторы промышленнных цепей',
      template: './src/constructors.html',
      chunks: ['index'],
      filename: 'konstructors/index.html',
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Конструктор тяговых пластинчатых цепей',
      template: './src/constructor.html',
      chunks: ['index', 'constrtyag'],
      filename: 'konstructors/konstruktor-tyagovoj-plastinchatoj-cepi/index.html',
    }),

    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pr-38-1",
      },
      title: 'ПР-38,1 (цепь однорядная, многорядная)',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-38-1-127/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pr-44-45",
      },
      title: 'ПР-44,45 (цепь однорядная, многорядная)',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-44-45/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pr-50",
      },
      title: 'ПР-50,8 (однорядная цепь)',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-50/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pr-63-5",
      },
      title: 'Цепь ПР-63.5 приводная роликовая',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-63-5/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pri-78-1",
      },
      title: 'Цепь ПРИ-78,1 приводная роликовая',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/tsepi-pri/pri-78-1/index.html",
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
        nameId: "pri-103-2",
      },
      title: 'Цепь ПРИ-103,2 приводная роликовая',
      template: './src/tsepi-privodnye.html',
      chunks: ['index'],
      filename: "prom-chains/tsepi-privodniye/tsepi-pri/pri-103-2/index.html",
    }),


    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new SitemapPlugin({ base: canonicalURL, paths }),
  ].concat(gruzItemsHtmlPlugins, mCategoriesPages, mItemsPages, mSpecPages)
}

/*

Цепи приводные роликовые ГОСТ 13568-97 однорядные, многорядные
/prom-chains/tsepi-privodniye

/prom-chains/tsepi-privodniye/pr-odnoryadnye


ПР-38,1 (цепь однорядная, многорядная)
/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-38-1-127

ПР-50,8 (однорядная цепь)
/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-50

ПР-44,45 (цепь однорядная, многорядная)
/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-44-45


/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-63-5
/prom-chains/tsepi-privodniye/pr-odnoryadnye/tsep-prf

/prom-chains/tsepi-privodniye/tsepi-pri
/prom-chains/tsepi-privodniye/tsepi-pri/pri-103-2
/prom-chains/tsepi-privodniye/tsepi-pri/pri-78-1
*/