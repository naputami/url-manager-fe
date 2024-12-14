import { Link } from '@/infrastructure/interfaces/entities'
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

type CardLatestLinkProps = {
    link: Partial<Link>
}
export const CardLatestLink = ({ link }: CardLatestLinkProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle><a href={link.link} className="underline hover:cursor-pointer" target="_blank" rel="noopener noreferrer">{link.title}</a></CardTitle>
                <CardDescription>Created at: {link.createdAt? new Date(link.createdAt).toLocaleDateString() : ''}</CardDescription>
                <Badge className="w-fit mt-2">{link.category?.name}</Badge>
            </CardHeader>
            <CardContent>
                {link.summary}
            </CardContent>
        </Card>
    )
}
