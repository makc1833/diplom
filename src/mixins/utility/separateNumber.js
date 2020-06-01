export const separateNumber = {
    methods: {
        separateNumber(value){

            if(isNaN(value) || value === null) {
                return '0'
            } else {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }

        },
    }
};