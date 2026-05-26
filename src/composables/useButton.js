export default function useButton() {
    const generateColor = (color) => {
        switch (color) {
            case 'primary':
                return 'bg-blue-500';
            case 'success' :
                return 'bg-green-500';
            case 'error' :
                return 'bg-red-500';
            case 'warning' :
                return 'bg-yellow-500';
            default :
                return 'bg-gray-500';
        }
    }
    return {
        generateColor
    }
}