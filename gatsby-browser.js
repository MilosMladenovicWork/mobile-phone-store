require('./src/components/global.scss')

const React = require('react')
const { ParallaxProvider} = require('react-scroll-parallax')


exports.wrapRootElement = ({element}) => {
    return (
        <ParallaxProvider>
            {element}
        </ParallaxProvider>
    )
}