import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/entities/user.entity";
import { JwtStrategy } from "./jwt-strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
            useFactory: async () => ({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '1h' },
            }),
          inject: [ConfigService],
        }),

        TypeOrmModule.forFeature(
            [User]
        ),
        
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
    exports: [AuthService]
  })
  export class AuthModule {}