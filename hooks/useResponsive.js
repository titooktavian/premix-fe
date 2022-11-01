import { useMediaQuery } from 'react-responsive';

function useResponsive() {

    const isMobile = useMediaQuery({
        maxWidth: '767px',
    });

    const isTablet = useMediaQuery({
        minWidth: '768px',
    });

    const isDesktop = useMediaQuery({
        minWidth: '1024px',
    });

    return {
        isDesktop,
        isTablet,
        isMobile,
    };
}

export default useResponsive;
