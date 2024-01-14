export type PostTable = {
    id: string,
    user: string,
    title: string,
    description: string,
    date: string
}

export type PostRaw = Omit<PostTable, 'date'> & {
    date: Date
}

export type User = {
    id: string,
    login: string,
    password: string
}