import './app.scss';
import gsap from 'gsap';
import { Core as Taxi, Renderer, Transition } from '@unseenco/taxi';

const delay = (n) => {
  n = n || 2000;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, n);
  });
};

gsap.defaults({
  ease: "expo.inOut",
  duration: "1.2"
});


class RendererDefault extends Renderer {
  initialLoad() {
    gsap.to('.preload', {
      yPercent: 100,
      display: 'none'
    })
  }

  onEnterCompleted() {
    gsap.to('.preload', {
      yPercent: -100,
      display: 'none'
    })
  }
}

class TransitionDefault extends Transition {
  async onLeave({ done }) {
    
    gsap.fromTo('.preload', {
      yPercent: 100,
    }, {
      yPercent: 0,
      display: 'flex'
    })

    await delay(1200);
    done();
  }

  async onEnter({ done }) {
    done();
  }
}

const taxi = new Taxi({
  renderers: {
    default: RendererDefault
  },
  transitions: {
    default: TransitionDefault,
  },
  reloadJsFilter: (element) => !element.hasAttribute('data-taxi-once')
});
