

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy('js')










  eleventyConfig.setEjsOptions({
    lbListJson: [
      {name: 'Themeparks',
      individuals: [
          {name:'Coins', lb_id:'coins', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
          {name:'Distance Walked', lb_id:'walked', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/background.png'},
      ],
      groups: [
          {name:'Rides', description:'View players with the most coins!', image:'/assets/images/themeparks.png', lbs:[
              {name:'Space Mountain', lb_id:'rides_sm'},
              {name:'Rollercoaster', lb_id:'rides_rc'},
          ]},
          {name:'Games', description:'View players with the most coins!', image:'/assets/images/creative.png', lbs:[
              {name:'Ring Toss', lb_id:'games_rt'},
              {name:'Other 1', lb_id:'games_1'},
              {name:'Other 2', lb_id:'games_2'},
              {name:'Ring Toss', lb_id:'games_rt'},

          ]},
      ]},

      {name: 'Creative',
      individuals: [
          {name:'Plots', lb_id:'coins', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/creative.png'},
          {name:'Coins', lb_id:'walked', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
      ],
      groups: [
          {name:'Rating', description:'View players with the most coins!', image:'/assets/images/background.png', lbs:[
              {name:'Space Mountain', lb_id:'rides_sm'},
              {name:'Rollercoaster', lb_id:'rides_rc'},
              {name:'Ring Toss', lb_id:'games_rt'},
              {name:'Other 1', lb_id:'games_1'},
          ]},
          {name:'Plot Details', description:'View players with the most coins!', image:'/assets/images/creative.png', lbs:[
              {name:'Ring Toss', lb_id:'games_rt'},
              {name:'Other 1', lb_id:'games_1'},
              {name:'Other 2', lb_id:'games_2'},
          ]},
      ]},

      {name: 'Skyblock',
      individuals: [
          {name:'Plots', lb_id:'coins', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/creative.png'},
          {name:'Coins', lb_id:'walked', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
      ],
      groups: [
          {name:'Rating', description:'View players with the most coins!', image:'/assets/images/background.png', lbs:[
              {name:'Space Mountain', lb_id:'rides_sm'},
              {name:'Rollercoaster', lb_id:'rides_rc'},
              {name:'Ring Toss', lb_id:'games_rt'},
              {name:'Other 1', lb_id:'games_1'},
          ]},
          {name:'Plot Details', description:'View players with the most coins!', image:'/assets/images/creative.png', lbs:[
              {name:'Ring Toss', lb_id:'games_rt'},
              {name:'Other 1', lb_id:'games_1'},
              {name:'Other 2', lb_id:'games_2'},
          ]},
      ]},
  ]

  });













  return {
    passthroughFileCopy: true,
    dir: {
      input: "pages"
    }
  }

}