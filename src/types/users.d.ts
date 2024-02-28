enum UserType {
    TEACHER = "Teacher",
    STUDENT = "Student",
}

type UserData = {
    token: string;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    user_type: UserType;
};
