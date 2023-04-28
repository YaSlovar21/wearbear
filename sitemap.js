const dateNow = (new Date()).toString();

const { mCategoryPages } = require('./gost588-81'); 
const { gruzTsepCategoryPages } = require('./gost191-82');
const { generatedChains } = require('./chains');
const { generatedSpecChains } = require('./chains-spec');

module.exports.paths = [
    {
      path: '/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-privodniye/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-m-mc/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-vtulochnye/',
      lastmod: dateNow,
      priority: 0.9,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-rolikovye/',
      lastmod: dateNow,
      priority: 0.9,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-m-mc/cepi-tyagovye-plastinchatye-katkovye/',
      lastmod: dateNow,
      priority: 0.9,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/gruz-tsepi/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    /* ---- ПРИВОДНЫЕ ---- */
    /* ПР-38,1 */
    {
      path: '/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-38-1-127/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },

    /* ПР-44,45 */
    {
      path: '/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-44-45/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },

    /* ПР-50,8 */
    {
      path: '/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-50/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },


    /* --- */
    {
      path: '/prom-chains/tsepi-privodniye/pr-odnoryadnye/pr-63-5/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-privodniye/tsepi-pri/pri-78-1/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    {
      path: '/prom-chains/tsepi-privodniye/tsepi-pri/pri-103-2/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },

].concat(mCategoryPages.map((item)=> {
  return {
    path: `/${item.fileName.split('index.html')[0]}`,
    lastmod: dateNow,
    priority: 0.8,
    changefreq: 'monthly',
  }
})).concat(gruzTsepCategoryPages.map((item)=> {
  return {
    path: `/${item.fileName.split('index.html')[0]}`,
    lastmod: dateNow,
    priority: 0.7,
    changefreq: 'monthly'
  }
})).concat(generatedChains.map((item) => {
  return {
    path: `/prom-chains/tsepi-m-mc/${item.relevanceChain}/${item.alias}.html`,
    lastmod: dateNow,
    priority: 0.7,
    changefreq: 'monthly'
  }
})).concat(generatedSpecChains.map((item) => {
  return {
    path: `/prom-chains/tsepi-m-mc/${item.relCategory}/${item.alias}.html`,
    lastmod: dateNow,
    priority: 0.6,
    changefreq: 'monthly'
  }
})
);