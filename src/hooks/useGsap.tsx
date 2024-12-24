import { useEffect } from 'react';
import { gsap } from 'gsap';

type GsapAnimationArgs = Parameters<typeof gsap.to | typeof gsap.from | typeof gsap.fromTo>;

type UseGsapOptions = {
    method: 'to' | 'from' | 'fromTo';
    target: GsapAnimationArgs[0];
    to?: GsapAnimationArgs[2];
    from?: GsapAnimationArgs[2];
    enabled?: boolean;
};

export function useGsap(animations: UseGsapOptions[]) {
    useEffect(() => {
        for (const { method, target, from = {}, to = {}, enabled = false } of animations) {
            if (enabled) {
                switch(method) {
                    case 'to': {
                        gsap.to(target, to);
                        return;
                    }
                    case 'from': {
                        gsap.from(target, from);
                        return;
                    }
                    case 'fromTo': {
                        gsap.fromTo(target, from, to);
                        return;
                    }
                }
            }
        }
    }, [animations])
}