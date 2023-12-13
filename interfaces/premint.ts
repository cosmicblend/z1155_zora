export interface PremintNftItem {
    contract_address: string;
    creator_address: string;
    collection: {
        name: string | null;
        symbol: string;
        description: string | null;
        image: string | null;
    };
    token_id: string;
    token_name: string;
    mint_context: {
        collection: {
            contractAdmin: string;
            contractUri: string;
        };
        premint: {
            tokenConfig: {
                pricePerToken:  string;
                maxTokensPerAddress: string;
                mintStart: string;
                mintDuration: string;
            };
        };
    };
    is_active: boolean;
    total_minted: string;
    start_datetime: string;
    end_datetime: string;
  }
  
  export interface PremintApiResponse {
    data: PremintNftItem[];
    //next_cursor?: string;
    //previous?: string;
  }
  