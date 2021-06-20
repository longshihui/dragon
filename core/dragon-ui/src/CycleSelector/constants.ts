export enum CYCLE {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export const SemanticCycleDictionary = new Map([
    [CYCLE.MONDAY, '星期一'],
    [CYCLE.TUESDAY, '星期二'],
    [CYCLE.WEDNESDAY, '星期三'],
    [CYCLE.THURSDAY, '星期四'],
    [CYCLE.FRIDAY, '星期五'],
    [CYCLE.SATURDAY, '星期六'],
    [CYCLE.SUNDAY, '星期天']
]);

export const SemanticCycles = [
    {
        label: SemanticCycleDictionary.get(CYCLE.MONDAY),
        value: CYCLE.MONDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.TUESDAY),
        value: CYCLE.TUESDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.WEDNESDAY),
        value: CYCLE.WEDNESDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.THURSDAY),
        value: CYCLE.THURSDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.FRIDAY),
        value: CYCLE.FRIDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.SATURDAY),
        value: CYCLE.SATURDAY
    },
    {
        label: SemanticCycleDictionary.get(CYCLE.SUNDAY),
        value: CYCLE.SUNDAY
    }
];

export enum CYCLE_TYPE {
    WORKDAY, // 工作日
    SCALE_WEEK, // 大小周
    CUSTOM // 自定义
}

export const SemanticCycleTypes = [
    {
        label: '工作日(双休)',
        value: CYCLE_TYPE.WORKDAY
    },
    {
        label: '工作日(大小周)',
        value: CYCLE_TYPE.SCALE_WEEK
    },
    {
        label: '自定义',
        value: CYCLE_TYPE.CUSTOM
    }
];
