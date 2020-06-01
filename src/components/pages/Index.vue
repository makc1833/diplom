<template lang="pug">
    include ../../tools/mixins.pug

    +b.page
        +e.form(
            :class="{'init-am-transition': animation.form.init, 'show-all-am-items': animation.form.show}"
        )
            +e.container.container
                +e.title--form.title.am--10 Введите параметры таблицы
                +e.RANGE-COMPONENT.input.am--12(
                    :label="range.rows.placeholder"
                    :value="range.rows.value"
                    :maxValue="range.rows.maxValue"
                    :minValue="range.rows.minValue"
                    :error="range.rows.error"
                    @change="changeRange('rows', $event)"
                )
                +e.RANGE-COMPONENT.input.am--14(
                    :label="range.columns.placeholder"
                    :value="range.columns.value"
                    :maxValue="range.columns.maxValue"
                    :minValue="range.columns.minValue"
                    :error="range.columns.error"
                    @change="changeRange('columns', $event)"
                )
                +e.BUTTON.button--form.button.button--standart.--gray.am--16(
                    v-on:click="generateInitialTable"
                ) Вывести таблицу
        +e.main(
            ref="main"
            v-if="animation.main.notRemoved"
            :class="{'init-am-transition': animation.main.init, 'show-all-am-items': animation.main.show}"
        )
            +e.container.container
                +e.title--main.title.am--2 Заполните исходную таблицу
                +e.TABLE-INPUT-COMPONENT.table--initial.am--4(
                    :headValues="tables.initial.headValues"
                    :values="tables.initial.values"
                    @changeHeadValue="tableHeadInputChange"
                    @changeValue="tableInputChange"
                )
                +e.button-wrapper
                    +e.BUTTON.button--form.button.button--standart.--gray.am--6(
                        v-on:click="calculateCorrelations"
                    ) Получить результаты
        +e.results(
            ref="results"
            v-if="animation.results.notRemoved"
            :class="{'init-am-transition': animation.results.init, 'show-all-am-items': animation.results.show}"
        )
            +e.result
                +e.container.container
                    +e.title--main.title.am--6 Результаты вычислений коэффициента корреляции Пирсона
                    +e.TABLE-CORRELATION-COMPONENT.table--correlation.am--8(
                        :values="tables.Pirson.values"
                    )
                    +e.graph-wrapper.am--10
                        +e.legend
                            +e.legend-item
                                p - - - - - , если коэффициент меньше 0.6
                            +e.legend-item
                                span
                                p , если коэффициент больше 0.6 включительно и меньше 0.8
                            +e.legend-item
                                span.bold
                                p , если коэффициент больше 0.8 включительно
                        +e.CANVAS.graph(
                            ref="graphPirson"
                        )
            +e.result
                +e.container.container
                    +e.title--main.title.am--12 Результаты вычислений коэффициента корреляции Спирмена
                    +e.TABLE-CORRELATION-COMPONENT.table--correlation.am--14(
                        :values="tables.Spirmen.values"
                    )
                    +e.graph-wrapper.am--16
                        +e.legend
                            +e.legend-item
                                p - - - - - , если коэффициент меньше 0.6
                            +e.legend-item
                                span
                                p , если коэффициент больше 0.6 включительно и меньше 0.8
                            +e.legend-item
                                span.bold
                                p , если коэффициент больше 0.8 включительно
                        +e.CANVAS.graph(
                            ref="graphSpirmen"
                        )
            +e.result
                +e.container.container
                    +e.title--main.title.am--18 Результаты вычислений коэффициента корреляции Кендалла
                    +e.TABLE-CORRELATION-COMPONENT.table--correlation.am--20(
                        :values="tables.Kendall.values"
                    )
                    +e.graph-wrapper.am--22
                        +e.legend
                            +e.legend-item
                                p - - - - - , если коэффициент меньше 0.6
                            +e.legend-item
                                span
                                p , если коэффициент больше 0.6 включительно и меньше 0.8
                            +e.legend-item
                                span.bold
                                p , если коэффициент больше 0.8 включительно
                        +e.CANVAS.graph(
                            ref="graphKendall"
                        )


</template>

<script>

    import Range from "../ui/Range.vue";
    import TableInput from "../ui/TableInput.vue";
    import TableCorrelation from "../ui/TableCorrelation.vue";
    import animatedScrollTo from 'animated-scroll-to'
    export default {
        data() {
            return {
                range: {
                    rows: {
                        error: false,
                        value: 2,
                        maxValue: 40,
                        minValue: 2,
                        placeholder: 'Количество строк'
                    },
                    columns: {
                        error: false,
                        value: 2,
                        maxValue: 20,
                        minValue: 2,
                        placeholder: 'Количество столбцов'
                    },
                },
                tables: {
                    initial: {
                        headValues: [],
                        values: []
                    },
                    ranging: {
                        values: []
                    },
                    Pirson: {
                        values: []
                    },
                    Spirmen: {
                        values: []
                    },
                    Kendall: {
                        values: []
                    }
                },
                animation: {
                    form: {
                        init: true,
                        show: false,
                    },
                    main: {
                        notRemoved: false,
                        init: true,
                        show: false,
                    },
                    results: {
                        notRemoved: false,
                        init: true,
                        show: false,
                    },
                }
            };
        },
        mounted(){
            this.animation.form.show = true;
            setTimeout(() => {
                this.animation.form.init = false;
                this.animation.form.show = false;
            },1500)
        },
        methods: {
            generateInitialTable(){
                this.animation.main.notRemoved = true;
                this.$nextTick(()=>{
                    this.animation.main.init = true;
                    setTimeout(() => {
                        this.tables.initial.headValues = [];
                        this.tables.initial.values = [];
                        for (let i = 0; i < this.range.rows.value; i++) {
                            this.tables.initial.values.push([]);
                        }
                        for (let i = 0; i < this.range.rows.value; i++){
                            for (let j = 0; j < this.range.columns.value; j++) {
                                if(i === 0){
                                    this.tables.initial.headValues.push({value: `Параметр_${j + 1}`});
                                }
                                this.tables.initial.values[i].push({value: 0});
                            }
                        }
                        this.animation.main.show = true;
                        this.$nextTick(()=>{
                            this.scrollToRef('main');
                        })
                        setTimeout(() => {
                            this.animation.main.init = false;
                            this.animation.main.show = false;
                        },1000)
                    },500)
                })
            },
            calculateCorrelations(){
                this.animation.results.notRemoved = true;
                this.$nextTick(()=>{
                    this.animation.results.init = true;
                    setTimeout(() => {
                        this.tableRanging();
                        this.createCorrelationTables();
                        this.calculatePirson();
                        this.calculateSpirmen();
                        this.calculateKendall();
                        this.animation.results.show = true;
                        this.$nextTick(()=>{
                            this.scrollToRef('results');
                        })
                        setTimeout(() => {
                            this.animation.results.init = false;
                            this.animation.results.show = false;
                        },1500)
                    },500)
                })
            },
            tableRanging(){
                this.tables.ranging.values = this.cloneMatrix(this.tables.initial.values);
                let rangeTable = [[],[],[],[]]
                rangeTable.map(row => {
                    for (let i = 0; i < this.range.columns.value; i++) {
                        row.push({value: 0})
                    }
                })
                for (let j = 0; j < this.range.columns.value; j++)
                {
                    for (let i = 0; i < this.range.rows.value; i++)
                    {
                        rangeTable[0][i] = this.tables.ranging.values[i][j].value === '' ? 0 : this.tables.ranging.values[i][j].value;
                        rangeTable[1][i] = rangeTable[0][i];
                        rangeTable[2][i] = i + 1;
                    }
                    let exit = false;
                    while (!exit)
                    {
                        exit = true;
                        for (let i = 0; i < this.range.rows.value - 1; i++)
                        {
                            if (rangeTable[1][i] > rangeTable[1][i + 1])
                            {
                                let a = rangeTable[1][i],
                                    b = rangeTable[1][i + 1];
                                rangeTable[1][i] = b;
                                rangeTable[1][i + 1] = a;
                                exit = false;
                            }
                        }
                    }
                    let first, last, ser;
                    exit = false;
                    while (!exit)
                    {
                        exit = true;
                        for (let i = 0; i < this.range.rows.value - 1; i++)
                        {
                            if ((rangeTable[1][i] === rangeTable[1][i + 1]) && (rangeTable[2][i] !== rangeTable[2][i + 1]))
                            {
                                first = i;
                                for (let j = i + 1; j < this.range.rows.value; j++){
                                    if (rangeTable[1][j] === rangeTable[1][i]){
                                        last = j;
                                    }
                                }
                                ser = (first + last) / 2 + 1;
                                for (let j = first; j <= last; j++){
                                    rangeTable[2][j] = ser;
                                }
                                exit = false;
                            }
                        }
                    }
                    for (let i = 0; i < this.range.rows.value; i++){
                        for (let j = 0; j < this.range.rows.value; j++){
                            if (rangeTable[0][i] === rangeTable[1][j]){
                                rangeTable[3][i] = rangeTable[2][j];
                            }
                        }
                    }
                    for (let i = 0; i < this.range.rows.value; i++){
                        this.tables.ranging.values[i][j].value = rangeTable[3][i];
                    }
                }
            },
            createCorrelationTables(){
                this.tables.Pirson.values = [];
                this.tables.Spirmen.values = [];
                this.tables.Kendall.values = [];
                let array = [];
                for (let i = 0; i < this.range.columns.value + 1; i++) {
                    array.push([]);
                    for (let j = 0; j < this.range.columns.value + 1; j++){
                        if(i === 0 && j === 0){
                            array[i].push({value: ''});
                        } else if(i === 0 && j > 0){
                            array[i].push({value: this.tables.initial.headValues[j - 1].value});
                        } else if(j === 0 && i > 0){
                            array[i].push({value: this.tables.initial.headValues[i - 1].value});
                        } else if(i > 0 && j > 0){
                            array[i].push({value: 0});
                        }
                    }
                }
                this.tables.Pirson.values = this.cloneMatrix(array);
                this.tables.Spirmen.values = this.cloneMatrix(array);
                this.tables.Kendall.values = this.cloneMatrix(array);
            },
            calculatePirson(){
                let sumArray = this.createArray(this.range.columns.value),
                    averageArray = this.createArray(this.range.columns.value),
                    calculatingArray = this.cloneMatrix(this.tables.initial.values),
                    wrapArray = [];

                for(let i = 0; i < this.range.rows.value; i++){
                    wrapArray.push(this.createArray(2));
                }
                for(let i = 0; i < this.range.columns.value; i++) {
                    for(let j = 0; j < this.range.rows.value; j++) {
                        sumArray[i].value += calculatingArray[j][i].value;
                    }
                    averageArray[i].value = sumArray[i].value/this.range.rows.value;
                }
                for(let i = 0; i < this.range.columns.value; i++) {
                    for(let j = 0; j < this.range.rows.value; j++) {
                        calculatingArray[j][i].value = calculatingArray[j][i].value - averageArray[i].value;
                    }
                }
                for(let i = 0; i < this.range.columns.value; i++) {
                    for(let j = 0; j < this.range.columns.value; j++) {
                        let sumSquaredDeviationsOfI = 0,
                            sumSquaredDeviationsOfJ = 0,
                            differenceProduct = 0;
                        for(let k = 0; k < this.range.rows.value; k++) {
                            wrapArray[k][0].value = Math.pow(calculatingArray[k][i].value,2);
                            wrapArray[k][1].value = Math.pow(calculatingArray[k][j].value,2);
                            sumSquaredDeviationsOfI += wrapArray[k][0].value;
                            sumSquaredDeviationsOfJ += wrapArray[k][1].value;
                            differenceProduct += calculatingArray[k][i].value * calculatingArray[k][j].value;
                        }
                        let devider = Math.sqrt(sumSquaredDeviationsOfI*sumSquaredDeviationsOfJ),
                            value = Math.ceil((differenceProduct / devider)*1000)/1000;
                        this.tables.Pirson.values[j + 1][i + 1].value = devider === 0 ? (differenceProduct > 0 ? 'Infinity' : '-Infinity') : value;
                    }
                }
                this.drowGraph('Pirson');
            },
            calculateSpirmen(){
                for(let i = 0; i < this.range.columns.value; i++) {
                    for(let j = 0; j < this.range.columns.value; j++) {
                        let squaresSum = 0,
                            difference = 0,
                            squareDifference = 0;
                        for(let k = 0; k < this.range.rows.value; k++) {
                            difference = this.tables.ranging.values[k][i].value - this.tables.ranging.values[k][j].value;
                            squareDifference = Math.pow(difference, 2);
                            squaresSum = squaresSum + squareDifference;
                        }
                        let value = Math.ceil((1 - (6 * squaresSum) / (this.range.rows.value * (Math.pow(this.range.rows.value,2) - 1)))*1000)/1000;
                        this.tables.Spirmen.values[j + 1][i + 1].value = value;
                    }
                }
                this.drowGraph('Spirmen');
            },
            calculateKendall(){
                let wrapArray = [];
                for(let i = 0; i < this.range.rows.value; i++){
                    wrapArray.push(this.createArray(2));
                }
                for(let i = 0; i < this.range.columns.value; i++) {
                    for(let j = 0; j < this.range.columns.value; j++) {
                        let sump = 0,
                            Pq = 0,
                            temp = 0,
                            temp2 = 0,
                            value = 0;
                        for(let k = 0; k < this.range.rows.value; k++) {
                            wrapArray[k][0].value = this.tables.ranging.values[k][i].value;
                            wrapArray[k][1].value = this.tables.ranging.values[k][j].value;
                        }
                        let chet = 0;
                        for(let k = 0; k < this.range.rows.value; k++) {
                            if(wrapArray[k][0].value === wrapArray[k][1].value) {
                                chet = chet + 1;
                            }
                        }
                        if(chet === this.range.rows.value) {
                            this.tables.Kendall.values[j + 1][i + 1].value = 1;
                            continue;
                        }
                        for (let k = 0; k < this.range.rows.value - 1; k++) {
                            for (let m = 0; m < this.range.rows.value - k - 1; m++) {
                                if (wrapArray[m][0].value > wrapArray[m + 1][0].value) {
                                    temp = wrapArray[m][0].value;
                                    temp2 = wrapArray[m][1].value;
                                    wrapArray[m][0].value = wrapArray[m + 1][0].value;
                                    wrapArray[m][1].value = wrapArray[m + 1][1].value;
                                    wrapArray[m + 1][0].value = temp;
                                    wrapArray[m + 1][1].value = temp2;
                                }
                            }
                        }
                        for(let k = 0; k < this.range.rows.value - 1; k++) {
                            if(wrapArray[k][1].value >= wrapArray[k + 1][1].value) {
                                wrapArray[k][0].value = 0;
                            } else if(wrapArray[k][1].value < wrapArray[k + 1][1].value) {
                                wrapArray[k][0].value = wrapArray[k + 1][1].value - wrapArray[k][1].value;
                            }
                            wrapArray[this.range.rows.value - 1][0].value = 0;
                        }

                        for(let k = 0; k < this.range.rows.value - 1 ; k++) {
                            sump = sump + wrapArray[k][0].value;
                        }
                        Pq = this.range.rows.value * ((this.range.rows.value - 1)/2) - sump;
                        value = Math.ceil(((4 * Pq)/(this.range.rows.value * (this.range.rows.value - 1)) - 1)*1000)/1000;
                        this.tables.Kendall.values[j + 1][i + 1].value = value;
                    }
                }
                for (let i = 1; i < this.range.columns.value + 1; i++) {
                    for (let j = 1; j < this.range.columns.value + 1; j++) {
                        if(i === j){
                            this.tables.Kendall.values[i][j].value = 1;
                        }
                        if(i < j){
                            this.tables.Kendall.values[i][j].value = this.tables.Kendall.values[j][i].value;
                        }
                    }
                }
                this.drowGraph('Kendall');
            },
            drowGraph(table){
                let canvas = this.$refs['graph' + table],
                    ctx = canvas.getContext('2d'),
                    canvasRect = canvas.getBoundingClientRect(),
                    radius = canvasRect.height / 2 - 130;
                canvas.width = canvasRect.width;
                canvas.height = canvasRect.height;
                let points = [];
                ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
                for (let i = 0; i < this.range.columns.value; i++) {
                    let rad = (Math.PI * 2 * i / this.range.columns.value)
                    points.push({
                        x: Math.cos(rad) * radius + canvasRect.width / 2,
                        y: Math.sin(rad) * radius + canvasRect.height / 2,
                        r: 10,
                    })
                }
                ctx.font = '1.333rem Arial';
                for (let i = 0; i < this.range.columns.value; i++){
                    let textRect = ctx.measureText(this.tables.initial.headValues[i].value);
                    ctx.fillText(
                        this.tables.initial.headValues[i].value.substring(0,10),
                        points[i].x > canvasRect.width / 2 ?  points[i].x + 10: points[i].x - textRect.width - 10,
                        points[i].y > canvasRect.height / 2 ? points[i].y + 25: points[i].y - 25);

                    for (let j = 0; j < this.range.columns.value; j++){
                        if(i > j){
                            let value = this.tables[table].values[i + 1][j + 1].value;
                            ctx.beginPath()
                            ctx.moveTo(points[i].x, points[i].y)
                            if(value < 0.6 || value === '-Infinity'){
                                ctx.setLineDash([8, 8]);
                                ctx.lineWidth = 1;
                            }
                            if(value >= 0.8){
                                ctx.setLineDash([]);
                                ctx.lineWidth = 3;
                            }
                            if((value >= 0.6 && value < 0.8) || value === 'Infinity'){
                                ctx.setLineDash([]);
                                ctx.lineWidth = 1;
                            }
                            ctx.lineTo(points[j].x, points[j].y)
                            ctx.stroke()
                            ctx.closePath()
                        } else {
                            continue;
                        }
                    }
                }
                points.forEach((point) => {
                    ctx.beginPath();
                    ctx.fillStyle = '#000000';
                    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                })
            },
            cloneMatrix(matrix){
                let newMatrix = [];
                matrix.map((row, index) => {
                    newMatrix.push([]);
                    row.map(column => {
                        newMatrix[index].push({value: column.value})
                    })
                })
                return newMatrix;
            },
            createArray(length){
                let array = [];
                for (let i = 0; i < length; i++) {
                    array.push({value: 0});
                }
                return array;
            },
            changeRange(name, value){
                this.range[name].value = value;
            },
            tableHeadInputChange(data){
                this.tables.initial.headValues[data.column].value = data.value;
            },
            tableInputChange(data){
                this.tables.initial.values[data.row][data.column].value = parseInt(data.value, 10);
            },
            scrollToRef(ref){
                animatedScrollTo(
                    this.$refs[ref],
                    {
                        speed: 1500,
                        easing: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
                    }
                )
            }
        },
        components: {
            'range-component': Range,
            'table-input-component': TableInput,
            'table-correlation-component': TableCorrelation
        }
    };
</script>