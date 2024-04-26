"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

interface citationInfo {
    author: string;
    articleName: string;
    newspaperName: string;

    releaseYear: number;
    releaseMonth: number;
    releaseDay: number;

    newsUrl: String;
}

function formHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: citationInfo = {
        // prettier-ignore
        author: formData.get("author") === "" ? "作者不詳" : (formData.get("author") as string),
        articleName: formData.get("aricle-name") as string,
        newspaperName: formData.get("newspaper-name") as string,

        releaseYear: parseInt(formData.get("release-year") as string),
        releaseMonth: parseInt(formData.get("release-month") as string),
        releaseDay: parseInt(formData.get("release-day") as string),

        newsUrl: decodeURIComponent(formData.get("news-url") as string),
    };

    generateRef(data);

    // console.log(JSON.stringify(data));
}

function generateRef(data: citationInfo) {
    const today = new Date();

    // prettier-ignore
    let genResult = `${data.author}：〈${data.articleName}〉，《${data.newspaperName}》，${data.releaseYear}年${data.releaseMonth}月${data.releaseDay}日。取自${data.newsUrl}，${today.getDate()}-${today.getMonth()}-${today.getFullYear()}擷取。`;

    navigator.clipboard.writeText(genResult);
}

export default function Home() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>港大徵引書目生成器</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={formHandler}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="author">作者</Label>
                            <Input id="author" name="author" placeholder="" />

                            <Label className="pt-3" htmlFor="aricle-name">
                                文章名稱
                            </Label>
                            <Input id="aricle-name" name="aricle-name" placeholder="" />

                            <Label className="pt-3" htmlFor="newspapaer-name">
                                報章名稱
                            </Label>
                            <Input id="newspaper-name" name="newspaper-name" placeholder="" />

                            <Label className="pt-3" htmlFor="newspapaer-name">
                                發報日期
                            </Label>
                            <Input
                                id="release-year"
                                name="release-year"
                                placeholder="年"
                            ></Input>
                            <Input
                                id="release-month"
                                name="release-month"
                                placeholder="月"
                            ></Input>
                            <Input
                                id="release-day"
                                name="release-day"
                                placeholder="日"
                            ></Input>

                            <Label className="pt-3" htmlFor="news-url">
                                連結
                            </Label>
                            <Input id="news-url" name="news-url" placeholder=""></Input>

                            <Button type="submit">提交</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
        </Card>
    );
}
