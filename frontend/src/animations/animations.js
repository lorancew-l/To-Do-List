export const screen = {
  xSmall: 320,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

export const modalAnimation = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {hidden: {opacity: 0}, visible: {opacity: 1}},
  transition: {duration: 0.3}
}

export const taskItemAnimation = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: {hidden: {opacity: 0},
             visible: {opacity: 1},
             exit: {opacity: 0}
            },
  transition: {duration: 0.3}
}

export function getTaskDetailAnimation(width) {
  let variants

  if (width > screen.small) {
    variants = {hidden: {opacity: 0, scale: 0.6, translateX: '-50%', translateY: '-25%'},
                visible: {opacity: 1, scale: 1, translateX: '-50%', translateY: '-25%'},}
  }
  else {
    variants = {hidden: {translateX: '-50%', translateY: '100%'},
    visible: {translateX: '-50%', translateY: 0},}
  }

  return {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
    variants,
    transition: {duration: 0.3}
  }
}

export const loaderAnimation = {
  animate: {rotate: 360},
  transition: {duration: 0.7,
               repeat: Infinity,
               ease: 'linear'}
}

export const loadingScreenAnimation = {
  initial: {opacity: 1},
  exit: {opacity: 0, transition: {duration: 0.3}}
}

export const filterListAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: {height: 0},
    animate: {height: 'auto'},
    exit: {height: 0}
  }
}