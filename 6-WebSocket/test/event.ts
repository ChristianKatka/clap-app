// db COMMENT EVENT
export const event = {
    "Records": [
        {
            "eventID": "5ebf9449f00cf607d013218a5c4eaa2e",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1640686631,
                "Keys": {
                    "id": {
                        "S": "2bef1c91-83e5-4fe3-bfa3-ed5b93683ee6"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1640686631274"
                    },
                    "nickname": {
                        "S": "ChristianKatka"
                    },
                    "id": {
                        "S": "2bef1c91-83e5-4fe3-bfa3-ed5b93683ee6"
                    },
                    "postId": {
                        "S": "1070a22d-c66e-4050-ba3e-66b3b3ddbb49"
                    },
                    "text": {
                        "S": "kiva kuulla"
                    },
                    "userId": {
                        "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
                    }
                },
                "SequenceNumber": "65344100000000031795219859",
                "SizeBytes": 214,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts-comments/stream/2021-12-14T14:43:52.495"
        }
    ]
}




//  SOCKET EVENT
// export const event = {
//     "headers": {
//         "Host": "66l1btssa8.execute-api.eu-west-1.amazonaws.com",
//         "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
//         "Sec-WebSocket-Key": "dA/DoGiMXDXpD0sTx0ihiQ==",
//         "Sec-WebSocket-Version": "13",
//         "X-Amzn-Trace-Id": "Root=1-61c6f648-13e9aaf1774b6fef1bdd72d3",
//         "X-Forwarded-For": "85.76.48.82",
//         "X-Forwarded-Port": "443",
//         "X-Forwarded-Proto": "https"
//     },
//     "multiValueHeaders": {
//         "Host": [
//             "66l1btssa8.execute-api.eu-west-1.amazonaws.com"
//         ],
//         "Sec-WebSocket-Extensions": [
//             "permessage-deflate; client_max_window_bits"
//         ],
//         "Sec-WebSocket-Key": [
//             "dA/DoGiMXDXpD0sTx0ihiQ=="
//         ],
//         "Sec-WebSocket-Version": [
//             "13"
//         ],
//         "X-Amzn-Trace-Id": [
//             "Root=1-61c6f648-13e9aaf1774b6fef1bdd72d3"
//         ],
//         "X-Forwarded-For": [
//             "85.76.48.82"
//         ],
//         "X-Forwarded-Port": [
//             "443"
//         ],
//         "X-Forwarded-Proto": [
//             "https"
//         ]
//     },
//     "requestContext": {
//         "routeKey": "$connect",
//         "eventType": "CONNECT",
//         "extendedRequestId": "K5trbG04joEFzdg=",
//         "requestTime": "25/Dec/2021:10:45:28 +0000",
//         "messageDirection": "IN",
//         "stage": "production",
//         "connectedAt": 1640429128939,
//         "requestTimeEpoch": 1640429128939,
//         "identity": {
//             "sourceIp": "85.76.48.82"
//         },
//         "requestId": "K5trbG04joEFzdg=",
//         "domainName": "66l1btssa8.execute-api.eu-west-1.amazonaws.com",
//         "connectionId": "K5trbcorjoECIfA=",
//         "apiId": "66l1btssa8"
//     },
//     "isBase64Encoded": false
// }

