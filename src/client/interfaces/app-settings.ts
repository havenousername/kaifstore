import { UpdateSettingsDto } from '../../backend/app-settings/dto/update-settings.dto';

export type EditableAppSettings = Pick<
  UpdateSettingsDto,
  'language' | 'moyskladIntegration' | 'moyskladEmail' | 'moyskladPassword'
>;
