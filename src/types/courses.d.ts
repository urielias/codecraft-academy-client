type Resource = {
    id: string;
    name: string;
    url: string;
};

enum ElementType {
    VIDEO = "video",
    TEXT = "text",
}

type Element = {
    id: string;
    type: ElementType;
    content: string;
    order: number;
};

type Section = {
    id: string;
    name: string;
    elements: Array<Element>;
};

type CoursePreview = {
    id: number;
    name: string;
    description: string;
    teacher_name: string;
    rating: number;
    enrolled: boolean;
    teaching: boolean;
};

type CourseDetail = {
    id: number;
    name: string;
    description: string;
    teacher_name: string;
    rating: number;
    sections: Array<Section>;
    resources: Array<Resource>;
};
