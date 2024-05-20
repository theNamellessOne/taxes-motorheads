import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { CarPost } from "@prisma/client";

export function CarPostContent(carPost: CarPost) {
  return (
    <Card className={"border-none bg-transparent shadow-none"}>
      <CardHeader className={"flex-col items-start gap-2"}>
        <p className={"text-lg"}>{carPost.preview}</p>
      </CardHeader>

      <CardBody>
        <p className={"whitespace-pre"}>{carPost.content}</p>
      </CardBody>
    </Card>
  );
}
