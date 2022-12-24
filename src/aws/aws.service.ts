import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
    constructor(){
        AWS.config.update({
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETACCESSKEY
        })
        this.s3 = new AWS.S3();
    }
    
    s3: any;
    
    async getImage(data){
        data = await this.s3.getSignedUrlPromise('getObject', data);
        return data;
    }

    uploadImageS3(file, id){
        let params = {
            Bucket: "libapp-1",
            Key: `images/${id}-${file.originalname}`,
            Body: file.buffer
        }

        this.s3.upload(params, (err) => {
            if(err)
                return (`erro ${err.message}`)
        })

        return "upload sucess";
    }
}    
