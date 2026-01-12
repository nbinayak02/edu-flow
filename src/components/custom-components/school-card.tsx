"use client";
import { CldImage } from "next-cloudinary";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UpdateDialog } from "../feature/dialog/update-school-dialog";
import { School } from "@/app/(system)/school/types";

export default function SchoolCard({
  userSchool,
}: {
  userSchool: School | null;
}) {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex flex-row gap-4 items-center">
          <CldImage
            src={userSchool?.logoPublicId ?? "eduflow_school_default_logo"} // Use this sample image or upload your own via the Media Library
            width="80" // Transform the image: auto-crop to square aspect_ratio
            height="80"
            alt="image"
            crop={{
              type: "auto",
              source: true,
            }}
            className="rounded-md"
          />
          <div>
            <p className="text-2xl text-center">
              {userSchool?.name ? userSchool?.name : "School Name"}
            </p>
            <CardDescription className="text-center">
              {userSchool?.address ? userSchool?.address : "School Address"}
            </CardDescription>
            <CardDescription className="text-center">
              ESTD:{userSchool?.estd}
            </CardDescription>
          </div>
        </CardTitle>
        <CardAction>
          <UpdateDialog schoolData={userSchool} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-row gap-3">
        <div>
          <p>Email:</p>
          <p>Contact Number: </p>
          <p>IEMIS: </p>
        </div>
        <div>
          <p>{userSchool?.email}</p>
          <p>{userSchool?.contact}</p>
          <p>{userSchool?.iemis}</p>
        </div>
      </CardContent>
    </Card>
  );
}
