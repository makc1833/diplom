<template lang="pug">
    include ../../tools/mixins

    +b.table(
        ref="table"
    )
        +e.row--head(
            v-if="headValues.length > 0"
        )
            +e.column(
                v-for="(column, columnIndex) in headValues"
                :style="{'width': `${100/headValues.length}%`}"
            )
                input(
                    :value="column.value"
                    v-on:input="$emit('changeHeadValue', {column: columnIndex, value: $event.target.value})"
                )
        +e.row(
            v-for="(row, rowIndex) in values"
        )
            +e.column(
                v-for="(column, columnIndex) in row"
                :style="{'width': `${100/row.length}%`}"
            )
                input(
                    type="number"
                    :value="column.value"
                    v-on:input="$emit('changeValue', {row: rowIndex, column: columnIndex, value: $event.target.value})"
                )
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
