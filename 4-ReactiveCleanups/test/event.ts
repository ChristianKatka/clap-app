export const event = {
    "Records": [
        {
            "eventID": "01a4bb23d7d08215d4d0dfc64a0edb2a",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1637504979,
                "Keys": {
                    "id": {
                        "S": "ca852a7d-5dc0-44d9-8cc4-25100c44010f"
                    }
                },
                "OldImage": {
                    "s3Key": {
                        "S": "avatar.jpg"
                    },
                    "name": {
                        "S": "avatar.jpg"
                    },
                    "id": {
                        "S": "ca852a7d-5dc0-44d9-8cc4-25100c44010f"
                    },
                    "mimeType": {
                        "S": "image/jpeg"
                    }
                },
                "SequenceNumber": "800000000082914187346",
                "SizeBytes": 123,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/images/stream/2021-11-21T11:54:52.143"
        }
    ]
}