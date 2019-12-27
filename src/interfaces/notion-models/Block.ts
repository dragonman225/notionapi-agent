import { BasicBlock } from "./block/BasicBlock"
import { DatabaseBlock } from "./block/Database"
import { MediaBlock } from "./block/Media"
import { EmbedBlock } from "./block/Embed"
import { AdvancedBlock } from "./block/AdvancedBlock"

/** 
 * Union of all types of blocks.
 * 
 * @category Notion Block
 */
export type Block =
  BasicBlock | DatabaseBlock | MediaBlock | EmbedBlock | AdvancedBlock