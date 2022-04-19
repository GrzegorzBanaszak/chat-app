import React from 'react'
import { LoaderBox,LoaderContainer,LoaderText,LoaderBall } from './loader.components'

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: "50%"
  },
  end: {
    y: "150%"
  }
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut"
};

const Loader = () => {
  return (
    <LoaderContainer>
        <LoaderText>Loading 
            <LoaderBox 
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
            >
                <LoaderBall variants={loadingCircleVariants} transition={loadingCircleTransition}/>
                <LoaderBall variants={loadingCircleVariants} transition={loadingCircleTransition}/>
                <LoaderBall variants={loadingCircleVariants} transition={loadingCircleTransition}/>
            </LoaderBox>
        </LoaderText>
    </LoaderContainer>
  )
}

export default Loader