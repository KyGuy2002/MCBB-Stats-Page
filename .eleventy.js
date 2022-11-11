module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('css')
    eleventyConfig.addPassthroughCopy('assets')
    eleventyConfig.addPassthroughCopy('js')
    return {
      passthroughFileCopy: true,
      dir: {
        input: "pages"
      }
    }
}