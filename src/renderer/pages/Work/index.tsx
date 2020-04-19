import React from 'react';
import {
    FunctionalList,
    FunctionalItem
} from '@/renderer/components/FunctionalView';
import { ApartmentOutlined } from '@ant-design/icons';

export default function Work() {
    return (
        <FunctionalList>
            <FunctionalItem
                title="需求模板"
                desc="快速生成需求所需的项目目录结构"
                path="/work/pr-template"
                icon={<ApartmentOutlined />}
            />
        </FunctionalList>
    );
}
