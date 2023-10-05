export class Users {
    usersId !: number;
    name !: string;
    slackUserId !: string;
    enterprise !: Enterprise;
    organization !: Organization;
}

export class Organization{
    id !: number;
    name !: string;
    state !: string;
    country !: string;
    imageData !: ImageData;
}

export class Enterprise{
    enterpriseId !: number;
    name !: string;
    createdDate !: Date;
    slackEnterpriseId !: string;
    apiAppId !: string;
}


