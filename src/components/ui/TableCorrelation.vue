<template lang="pug">
    include ../../tools/mixins

    +b.table
        +e.row(
            v-for="(row, rowIndex) in values"
            :class="{'table__row--head': rowIndex === 0}"
        )
            +e.column(
                v-for="(column, columnIndex) in row"
                :class="{'table__column--head': columnIndex === 0}"
                :style="{'width': `${100/row.length}%`}"
            ) {{ column.value }}
</template>

<script>


    export default {
        props: {
            headValues: {
                type: Array,
                required: false,
            },
            values: {
                type: Array,
                required: true,
            },
        },
    }
</script>
